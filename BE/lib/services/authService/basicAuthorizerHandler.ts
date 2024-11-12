import * as dotenv from 'dotenv';
import * as path from "path";

dotenv.config({path: path.join(__dirname, './.env')});

//@ts-ignore
export async function handler(event) {
    try {
        const authHeader = event.headers.Authorization;
        if (!authHeader) {
            return {
                statusCode: 401,
                body: 'Authorization header is missing'
            };
        }
        const [authType, token] = authHeader.split(' ');
        if (authType !== 'Basic' || !token) {
            return {
                statusCode: 401,
                body: 'Invalid Authorization header format'
            };
        }
        const [username, password] = Buffer.from(token, 'base64').toString('utf-8').split(':');

        const expectedPassword = process.env[username];
        if (!expectedPassword || expectedPassword !== password) {
            return {
                statusCode: 403,
                body: 'Access denied'
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
