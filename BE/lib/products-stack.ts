import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as cdk from 'aws-cdk-lib';
import * as path from 'path';
import { Construct } from 'constructs';

export class ProductServiceStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const getProductsListLambdaFunction = new lambda.Function(this, 'get-products-list', {
      runtime: lambda.Runtime.NODEJS_20_X,
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      handler: 'getProductsListHandler.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, './services/productService')),
    });

    const getProductsByIdLambdaFunction = new lambda.Function(this, 'get-products-by-id', {
      runtime: lambda.Runtime.NODEJS_20_X,
      memorySize: 1024,
      timeout: cdk.Duration.seconds(5),
      handler: 'getProductsByIdHandler.handler',
      code: lambda.Code.fromAsset(path.join(__dirname, './services/productService')),
    });

    const api = new apigateway.RestApi(this, "products-api", {
      restApiName: "API Products",
      description: "This API serves the Lambda functions."
    });

    const productsListLambdaIntegration = new apigateway.LambdaIntegration(getProductsListLambdaFunction, {});
    const productsResource = api.root.addResource("products");
    productsResource.addMethod('GET', productsListLambdaIntegration);

    const productIdLambdaIntegration = new apigateway.LambdaIntegration(getProductsByIdLambdaFunction, {});
    productsResource.addResource('{productId}').addMethod('GET', productIdLambdaIntegration);



  }
}