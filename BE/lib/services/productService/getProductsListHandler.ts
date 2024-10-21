import * as path from "node:path";
import * as fs from "node:fs";

const filePath = path.join(__dirname, "products-mock-data.json")
const rawData = fs.readFileSync(filePath, "utf8")
export async function handler() {
    return {
        body: JSON.stringify(rawData),
        statusCode: 200,
        headers:{
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, Content-Type, Accept, Authorization',
        }
    };
}


