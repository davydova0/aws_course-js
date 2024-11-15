import * as cdk from 'aws-cdk-lib';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import {Construct} from "constructs";
import * as path from 'path';
import * as iam from 'aws-cdk-lib/aws-iam';

export class AuthorizationServiceStack extends cdk.Stack {

    constructor(scope: Construct, id: string, props: cdk.StackProps) {
        super(scope, id, props);

        const basicAuthorizerLambda = new lambda.Function(this, 'basic-authorizer-lambda', {
            runtime: lambda.Runtime.NODEJS_20_X,
            handler: 'basicAuthorizerHandler.handler',
            code: lambda.Code.fromAsset(path.join(__dirname, './services/authService')),
            role: new iam.Role(this, 'LambdaExecutionRole', {
                assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
                managedPolicies: [
                    iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole')
                ]
            })
        })

        new cdk.CfnOutput(this, 'BasicAuthorizerLambdaArn', {
            value: basicAuthorizerLambda.functionArn,
            exportName: 'BasicAuthorizerLambdaArn'
        });
    }
}
