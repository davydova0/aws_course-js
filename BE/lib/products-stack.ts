import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from "aws-cdk-lib/aws-apigateway";

import * as cdk from 'aws-cdk-lib';
import * as path from 'path';
import { Construct } from 'constructs';
import { Table } from 'aws-cdk-lib/aws-dynamodb'
import * as sqs from "aws-cdk-lib/aws-sqs";
import * as lambdaEventSources from '@aws-cdk/aws-lambda-event-sources';
import * as sns from 'aws-cdk-lib/aws-sns';
import * as subscriptions from 'aws-cdk-lib/aws-sns-subscriptions';
import * as iam from 'aws-cdk-lib/aws-iam';

const lambdaPath = path.join(__dirname, './services/productService');

export class ProductServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const getProductsListLambdaFunction = new lambda.Function(this, 'get-products-list', {
      runtime: lambda.Runtime.NODEJS_20_X,
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      handler: 'getProductsListHandler.handler',
      code: lambda.Code.fromAsset(lambdaPath),
    });

    const getProductsByIdLambdaFunction = new lambda.Function(this, 'get-products-by-id', {
      runtime: lambda.Runtime.NODEJS_20_X,
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      handler: 'getProductsByIdHandler.handler',
      code: lambda.Code.fromAsset(lambdaPath),
    });

    const productTable = Table.fromTableName(this, 'ProductsTable', 'Products');

    const addProductLambdaFunction = new lambda.Function(this, 'add-product-to-db', {
      runtime: lambda.Runtime.NODEJS_20_X,
      handler: 'addProductToDBHandler.handler',
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      code: lambda.Code.fromAsset(lambdaPath),
      environment: {
        TABLE_NAME: productTable.tableName,
      }
    });

    const api = new apigateway.RestApi(this, "products-api", {
      restApiName: "API Products",
      description: "This API serves the Lambda functions."
    });

    const productsListLambdaIntegration = new apigateway.LambdaIntegration(getProductsListLambdaFunction, {});
    const addProductLambdaIntegration = new apigateway.LambdaIntegration(addProductLambdaFunction, {});

    const productsResource = api.root.addResource("products");
    productsResource.addMethod('POST', addProductLambdaIntegration);
    productsResource.addMethod('GET', productsListLambdaIntegration);

    const productIdLambdaIntegration = new apigateway.LambdaIntegration(getProductsByIdLambdaFunction, {});
    productsResource.addResource('{productId}').addMethod('GET', productIdLambdaIntegration);

    const stackTable = Table.fromTableName(this, 'StockTable', 'Stock');

    productTable.grantReadWriteData(addProductLambdaFunction);
    productTable.grantReadWriteData(getProductsListLambdaFunction);
    productTable.grantReadWriteData(getProductsByIdLambdaFunction);
    stackTable.grantReadWriteData(getProductsListLambdaFunction);
    stackTable.grantReadWriteData(getProductsByIdLambdaFunction);
    stackTable.grantReadWriteData(addProductLambdaFunction);

    const catalogItemsQueue = new sqs.Queue(this, 'catalog-items-queue',
        { visibilityTimeout: cdk.Duration.seconds(300)});

    const createProductTopic = new sns.Topic(this, 'create-product-topic', {
      displayName: 'Product creation notifications',
      topicName: 'createProductTopic'
    });

    const emailSubscription = new subscriptions.EmailSubscription('olha_davydova@epam.com');

    createProductTopic.addSubscription(emailSubscription);

    const catalogBatchProcessLambdaFunction = new lambda.Function(this, 'catalog-batch-process', {
      runtime: lambda.Runtime.NODEJS_20_X,
      memorySize: 1024,
      handler: 'catalogBatchProcess.handler',
      code: lambda.Code.fromAsset(lambdaPath),
      timeout: cdk.Duration.seconds(300),
      environment:{
        QUEUE_NAME: catalogItemsQueue.queueName,
        TABLE_NAME: productTable.tableName,
        SNS_TOPIC_ARN: createProductTopic.topicArn
      },
      role: new iam.Role(this, 'LambdaExecutionRole', {
        assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
        managedPolicies: [
          iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')
        ]
      })

    });

    //@ts-ignore
    createProductTopic.grantPublish(catalogBatchProcessLambdaFunction.role);
    productTable.grantReadWriteData(catalogBatchProcessLambdaFunction);

    //@ts-ignore
    catalogBatchProcessLambdaFunction.addEventSource(new lambdaEventSources.SqsEventSource(catalogItemsQueue, {
      batchSize: 5
    }))
  }
}