import {BatchGetItemCommand, DynamoDBClient} from "@aws-sdk/client-dynamodb";

const dynamoDB = new DynamoDBClient({region: "us-east-1"});

const getParams = (id: string) => ({
    RequestItems: {
        "Products": {
            "Keys": [
                {id: {S: id}}
            ]
        },
        "Stock": {
            "Keys": [{
                "product_id": {S: id}
            }]
        }
    }
})

// @ts-ignore
export async function handler(event) {
    try {
        const params = getParams(event.pathParameters.productId);

        // @ts-ignore
        const command = new BatchGetItemCommand(params);
        const response = await dynamoDB.send(command);
        return {
            body: JSON.stringify(response.Responses),
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept, Authorization',
            }
        };
    } catch (err) {
        // @ts-ignore
        const {message} = err;
        return {
            message: message,
            statusCode: 500,
        };
    }
}
