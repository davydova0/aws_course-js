const {DynamoDBClient} = require('@aws-sdk/client-dynamodb');
const {DynamoDBDocumentClient, PutCommand} = require('@aws-sdk/lib-dynamodb');
import {randomUUID} from "crypto";

const {SNSClient, PublishCommand} = require('@aws-sdk/client-sns');

const dynamoDBClient = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(dynamoDBClient);
const snsClient = new SNSClient();

exports.handler = async function (event: any) {
    for (const record of event.Records) {

        const body = JSON.parse(record.body);

        const params = {
            TableName: process.env.TABLE_NAME,
            Item: {
                id: randomUUID(),
                title: body.title,
                description: body.description,
                price: body.price
            }
        };

        try {
            await docClient.send(new PutCommand(params));

            const snsParams = {
                Message: `New product created: ${params.Item.title.S}`,
                TopicArn: process.env.SNS_TOPIC_ARN
            };
            await snsClient.send(new PublishCommand(snsParams));
        } catch (error: any) {
            console.error('Error putting item into DynamoDB', error);
            throw new Error(`Error putting item into DynamoDB: ${error.message}`);
        }
    }
};