import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3n from "aws-cdk-lib/aws-s3-notifications";

import * as cdk from 'aws-cdk-lib';
import * as path from 'path';
import {Construct} from 'constructs';
import * as apigateway from "aws-cdk-lib/aws-apigateway";
import * as iam from 'aws-cdk-lib/aws-iam';

export class ImportServiceStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const bucket = new s3.Bucket(this, 'importservicestacktaskfive', {
            versioned: true,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            cors: [
                {
                    allowedMethods: [s3.HttpMethods.GET, s3.HttpMethods.PUT],
                    allowedOrigins: ['*'],
                    allowedHeaders: ['*'],
                }
            ]
        });

        const importProductsFileLambda = new lambda.Function(this, 'import-products-file', {
            runtime: lambda.Runtime.NODEJS_20_X,
            handler: 'importProductsFile.handler',
            code: lambda.Code.fromAsset(path.join(__dirname, './services/productService')),
            environment: {
                BUCKET_NAME: bucket.bucketName,
            }
        });

        const importFileParserLambda = new lambda.Function(this, 'import-file-parser', {
            runtime: lambda.Runtime.NODEJS_20_X,
            handler: 'importFileParser.handler',
            code: lambda.Code.fromAsset(path.join(__dirname, './services/productService')),
            environment: {
                BUCKET_NAME: bucket.bucketName,
            }
        });

        bucket.grantReadWrite(importProductsFileLambda);
        bucket.grantReadWrite(importFileParserLambda);
        bucket.addEventNotification(s3.EventType.OBJECT_CREATED, new s3n.LambdaDestination(importFileParserLambda), {prefix: 'uploaded/'});

        const api = new apigateway.RestApi(this, "import-products-api", {
            restApiName: "Import API Products"
        });

        const importProductsLambdaIntegration = new apigateway.LambdaIntegration(importProductsFileLambda, {});

        const basicAuthorizerLambdaArn = cdk.Fn.importValue('BasicAuthorizerLambdaArn');

        const basicAuthorizerFunction = lambda.Function.fromFunctionArn(this, 'ImportedBasicAuthorizerFunction', basicAuthorizerLambdaArn);

        basicAuthorizerFunction.addPermission('ApiGatewayPermission', {
            principal: new iam.ServicePrincipal('apigateway.amazonaws.com'),
            action: 'lambda:InvokeFunction',
            sourceArn: api.arnForExecuteApi(),
        });

        const basicAuthorizer = new apigateway.RequestAuthorizer(this, 'BasicAuthorizer', {
            handler: basicAuthorizerFunction,
            identitySources: ['method.request.header.Authorization'],
            assumeRole: new iam.Role(this, 'LambdaAuthorizerRole', {
                assumedBy: new iam.ServicePrincipal('apigateway.amazonaws.com'),
            }),
        });

        const importProductsResource = api.root.addResource("import-products", {});
        importProductsResource.addMethod('GET', importProductsLambdaIntegration, {
            authorizer: basicAuthorizer,
            authorizationType: apigateway.AuthorizationType.CUSTOM,
        });

        const corsIntegration = new apigateway.MockIntegration({
            integrationResponses: [{
                statusCode: '200',
                responseParameters: {
                    'method.response.header.Access-Control-Allow-Headers': "'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token,Access-Control-Allow-Headers,Access-Control-Allow-Origin,Access-Control-Allow-Methods'",
                    'method.response.header.Access-Control-Allow-Origin': "'*'",
                    'method.response.header.Access-Control-Allow-Methods': "'OPTIONS,GET,POST,PUT,DELETE'"
                }
            }],
            passthroughBehavior: apigateway.PassthroughBehavior.NEVER,
            requestTemplates: {
                "application/json": "{\"statusCode\": 200}"
            }
        });

        const optionsMethodResponse = {
            statusCode: '200',
            responseParameters: {
                'method.response.header.Access-Control-Allow-Headers': true,
                'method.response.header.Access-Control-Allow-Methods': true,
                'method.response.header.Access-Control-Allow-Origin': true,
            }
        };

        importProductsResource.addMethod('OPTIONS', corsIntegration, {
            methodResponses: [optionsMethodResponse]
        });
    }
}