import {S3Client, GetObjectCommand} from "@aws-sdk/client-s3";
import {Readable} from 'stream';
import * as csv from 'csv-parser';

const s3Client = new S3Client({region: "us-east-1"});

//@ts-ignore
export async function handler(event) {
    const bucketName = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));

    const params = {
        Bucket: bucketName,
        Key: key,
    };

    try {
        const data = await s3Client.send(new GetObjectCommand(params));
        const stream = data.Body;

        //@ts-ignore
        const readStream = stream && stream.pipe(new Readable().wrap(stream));

        console.log(`Processing file: ${key} from bucket: ${bucketName}`);

        readStream.pipe(csv())
            .on('data', (data: any) => {
                console.log(data);
            })
            .on('end', () => {
                console.log(`CSV file ${key} processing completed.`);
            })
            .on('error', (error: any) => {
                console.error(`Error processing file ${key}:`, error);
                throw error;
            });
    } catch (error) {
        console.error(`Error getting object ${key} from bucket ${bucketName}. Make sure they exist and your bucket is in the same region as this function.`);
        throw error;
    }
}