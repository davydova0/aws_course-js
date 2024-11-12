import * as dotenv from 'dotenv';
import * as path from "path";

dotenv.config({path: path.join(__dirname, './.env')});

//@ts-ignore
export async function handler(event) {
    try {
        const authHeader = event.headers.Authorization;
        if (!authHeader) {
            return {
                policyDocument: {
                    Version: '2012-10-17',
                    Statement: [{Action: 'execute-api:Invoke', Effect: 'Deny', Resource: event.methodArn}],
                }
            };
        }
        const [authType, token] = authHeader.split(' ');
        if (authType !== 'Basic' || !token) {
            return {
                policyDocument: {
                    Version: '2012-10-17',
                    Statement: [{Action: 'execute-api:Invoke', Effect: 'Deny', Resource: event.methodArn}],
                }
            };
        }
        const [username, password] = Buffer.from(token, 'base64').toString('utf-8').split(':');

        const expectedPassword = process.env[username];
        if (!expectedPassword || expectedPassword !== password) {
            return {

                policyDocument: {
                    Version: '2012-10-17',
                    Statement: [{Action: 'execute-api:Invoke', Effect: 'Deny', Resource: event.methodArn}],
                }
            };
        }
        return {
            policyDocument: {
                Version: '2012-10-17',
                Statement: [{Action: 'execute-api:Invoke', Effect: 'Allow', Resource: event.methodArn}],
            }
        };
    } catch (err) {
        console.log(err)
    }

}
