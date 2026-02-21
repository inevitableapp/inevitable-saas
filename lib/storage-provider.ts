import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const s3Client = new S3Client({
    region: process.env.AWS_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
    },
});

export class StorageProvider {
    static async uploadExport(buffer: Buffer, key: string, contentType: string) {
        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
            Body: buffer,
            ContentType: contentType,
        });

        await s3Client.send(command);
        return key;
    }

    static async getPresignedDownloadUrl(key: string, expiresSeconds: number = 3600) {
        const command = new GetObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: key,
        });

        return await getSignedUrl(s3Client, command, { expiresIn: expiresSeconds });
    }
}
