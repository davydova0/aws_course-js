import {DynamoDBClient, PutItemCommand} from "@aws-sdk/client-dynamodb";
import {randomUUID} from "crypto";

const dynamodb = new DynamoDBClient();
const tableName = "Products";

// @ts-ignore
export async function handler(event) {
    const data = event.body ? JSON.parse(event.body) : event;
    try {
        const command = new PutItemCommand({
            TableName: tableName,
            Item: {
                id: {S: randomUUID()},
                title: {S: data.title},
                description: {S: data.description},
                price: {S: data.price},
            }
        });

        const result = await dynamodb.send(command)

        return {
            body: JSON.stringify(result),
            statusCode: 200,
        };
    } catch (err) {
        // @ts-ignore
        const {message} = err;
        return {
            statusCode: 500,
            body: JSON.stringify({message: message}),
        };
    }
}

