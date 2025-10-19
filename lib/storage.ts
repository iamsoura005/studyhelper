import { put, del } from '@vercel/blob';

export async function uploadPDF(file: File): Promise<string> {
  const blob = await put(file.name, file, {
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
  return blob.url;
}

export async function deletePDF(url: string): Promise<void> {
  await del(url, {
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
}
