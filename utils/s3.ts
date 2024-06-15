import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: process.env.ARVANCLOUD_REGIONS_SIMIN!,
  credentials: {
    accessKeyId: process.env.ARAVANCLOUD_ACCESS_KEY_ID!,
    secretAccessKey: process.env.ARAVANCLOUD_SECRET_KEY!,
  },
});

export { s3 };
