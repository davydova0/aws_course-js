import * as path from "node:path";
import * as fs from "node:fs";

const filePath = path.join(__dirname, "products-mock-data.json")
const rawData = fs.readFileSync(filePath, "utf8")
const products = JSON.parse(rawData);

// @ts-ignore
export async function handler(event){
    const product = products.find((p: { id: any; }) => p.id == event.pathParameters.productId)
    return {
        body: JSON.stringify(product),
        statusCode: 200,
    };
}
