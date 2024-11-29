#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ProductServiceStack } from '../lib/products-stack';
import {AuthorizationServiceStack} from "../lib/authorization-service-stack";
import {ImportServiceStack} from "../lib/import-service-stack";
import {BackendIntegrationStack} from "../lib/backend-integration-stack";

const app = new cdk.App();
new AuthorizationServiceStack(app, 'AuthorizationServiceStack', {})

new ProductServiceStack(app, 'ProductServiceStack', {});

new ImportServiceStack(app, 'ImportServiceStack', {})

// const envAPS  = { account: '536697227434', region: 'us-east-1' };
new BackendIntegrationStack(app, 'BackendIntegrationStack', {})

