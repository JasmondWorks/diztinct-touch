import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
  CreateBucketCommand,
  HeadBucketCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const region = process.env.AWS_REGION || "us-east-2";
const endpoint = process.env.AWS_ENDPOINT_URL_S3;
const bucket = process.env.AWS_S3_BUCKET || "assets";

export const s3 = new S3Client({
  endpoint: endpoint,
  region: region,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
  forcePathStyle: true,
});

let bucketVerified = false;

export async function ensureBucketExists(): Promise<string> {
  if (bucketVerified) return bucket;
  try {
    await s3.send(new HeadBucketCommand({ Bucket: bucket }));
    bucketVerified = true;
  } catch (err: any) {
    try {
      await s3.send(new CreateBucketCommand({ Bucket: bucket }));
      bucketVerified = true;
    } catch (createErr) {
      console.warn("Could not create bucket (may already exist):", createErr);
    }
  }
  return bucket;
}

export async function uploadToS3(
  buffer: Buffer,
  key: string,
  contentType: string = "image/webp"
): Promise<{ url: string; key: string }> {
  await ensureBucketExists();

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: buffer,
      ContentType: contentType,
    })
  );

  // Generate permanent or long-lived public URL for the stored asset
  // Since Neon Storage S3 endpoints support direct path-style URLs when public,
  // or presigned URLs for private buckets, we construct the direct URL:
  const directUrl = `${endpoint?.replace(/\/$/, "")}/${bucket}/${key}`;

  return {
    url: directUrl,
    key,
  };
}

export async function getPresignedViewUrl(key: string, expiresInSeconds: number = 86400): Promise<string> {
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  return await getSignedUrl(s3, command, { expiresIn: expiresInSeconds });
}

export async function deleteFromS3(key: string): Promise<boolean> {
  try {
    await s3.send(new DeleteObjectCommand({ Bucket: bucket, Key: key }));
    return true;
  } catch (err) {
    console.error(`Failed to delete S3 object ${key}:`, err);
    return false;
  }
}
