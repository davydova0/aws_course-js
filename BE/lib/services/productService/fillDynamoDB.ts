import * as AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';

AWS.config.update({ region: 'us-east-1' });

const dynamodb = new AWS.DynamoDB.DocumentClient();

const products = [
    {
        "title": "Golden Ornament",
        "description": "A beautiful golden ornament for decoration",
        "price": 1000
    },
    {
        "title": "Ruby Earrings",
        "description": "Elegant earrings with rubies",
        "price": 1200
    },
    {
        "title": "Diamond Ring",
        "description": "Luxurious diamond ring",
        "price": 3000
    },

];

async function putItem(tableName: string, item: any) {
    const params = {
        TableName: tableName,
        Item: item,
    };
    try {
        await dynamodb.put(params).promise();
        console.log(`Added item to ${tableName}:`, item);
    } catch (error) {
        console.error('Error adding item to table:', error);
    }
}

async function main() {
    for (const product of products) {
        const productId = uuidv4();

        await putItem('Products', {
            id: productId,
            ...product,
        });

        await putItem('Stock', {
            product_id: productId,
            count: 5,
        });
    }
}

main();