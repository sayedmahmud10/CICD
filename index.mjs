import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

const client = new SQSClient({
    region: "us-east-1"
});
//add comment no comment 
export const handler = async (event) => {
    try {
        const body = event.body ? JSON.parse(event.body) : {};

        const command = new SendMessageCommand({
            QueueUrl: process.env.QUEUE_URL,
            MessageBody: JSON.stringify({
                orderId: body.orderId || "123",
                amount: body.amount || 100
            })
        });

        const response = await client.send(command);

        console.log("Message sent:", response);

        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Message sent successfully"
            })
        };

    } catch (error) {
        console.error("Error:", error);

        return {
            statusCode: 500,
            body: JSON.stringify({
                error: error.message
            })
        };
    }
};
