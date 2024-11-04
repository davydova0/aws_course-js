import {S3Client, GetObjectCommand} from "@aws-sdk/client-s3";
import {Readable} from 'stream';
import * as csv from 'csv-parser';
import {SQSClient, SendMessageCommand, GetQueueUrlCommand} from "@aws-sdk/client-sqs";


const s3Client = new S3Client({region: "us-east-1"});
const sqsClient = new SQSClient({ region: "us-east-1" });
const queueName = process.env.QUEUE_NAME;

async function getQueueUrl(queueName:any) {
    const params = {
        QueueName: queueName // Имя очереди SQS
    };

    try {
        const data = await sqsClient.send(new GetQueueUrlCommand(params));
        return data.QueueUrl; // Возвращает URL очереди
    } catch (error) {
        console.error("Error getting queue URL:", error);
        throw error;
    }
}

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
        const queueUrl = await getQueueUrl(queueName);

        //@ts-ignore
        const readStream = stream && stream.pipe(new Readable().wrap(stream));

        readStream.pipe(csv())
            .on('data', async (data:any) => {

                const messageBody = JSON.stringify(data);
                const sendMessageParams = {
                    QueueUrl: queueUrl,
                    MessageBody: messageBody,
                };

                try {
                    const sendMessageResponse = await sqsClient.send(new SendMessageCommand(sendMessageParams));
                    console.log(`Message sent to SQS: ${sendMessageResponse.MessageId}`);
                } catch (error) {
                    console.error("Error sending message to SQS:", error);
                }
            })
    }  catch (error) {
        console.error(`Error getting object ${key} from bucket ${bucketName}. Make sure they exist and your bucket is in the same region as this function.`);
        throw error;
    }
}