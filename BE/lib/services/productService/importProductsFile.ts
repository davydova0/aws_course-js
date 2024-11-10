import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({region: "us-east-1"});

// @ts-ignore
export async function handler(event) {
    const fileName = event.queryStringParameters?.fileName;
    if (!fileName) {
        return {
            statusCode: 400,
            body: JSON.stringify({message: "File name is required in the query string parameters."})
        };
    }

    const bucketName = process.env.BUCKET_NAME;
    const key = `uploaded/${fileName}`;

    try {
        const command = new PutObjectCommand({
            Bucket: bucketName,
            Key: key,
        });

        const signedUrl = await getSignedUrl(s3Client, command);

        return {
            statusCode: 200,
            body: JSON.stringify({signedUrl}),
            headers: {
                "Content-Type": "*",
                "Access-Control-Allow-Methods": "*",
                "Access-Control-Allow-Headers": "*",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true",
            }
        };
    } catch (error) {
        console.error('Error generating signed URL:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({message: "Error generating signed URL"}),
        };
    }
}