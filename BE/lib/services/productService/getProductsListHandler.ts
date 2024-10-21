
import {DynamoDBClient} from "@aws-sdk/client-dynamodb";
import {ScanCommand} from "@aws-sdk/lib-dynamodb";
import {Product} from "../../types/productsType";

const client = new DynamoDBClient({region: "us-east-1"});
const paramsProducts = {
    TableName: "Products",
};

const paramsStock = {
    TableName: "Stock",
};

export async function handler() {
    try {
        // @ts-ignore
        const {Items: productsItems} : {productsItems: Product[]} = await client.send(new ScanCommand(paramsProducts));
        // @ts-ignore
        const {Items: stockItems} : {stockItems: Product[]} = await client.send(new ScanCommand(paramsStock));

        const combineData = [...productsItems, ...stockItems];

        return {
            body: JSON.stringify(combineData),
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
