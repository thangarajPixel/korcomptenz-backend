import { BlobServiceClient } from "@azure/storage-blob";

export default ({ providerOptions }) => {
  const { sasToken, serviceBaseURL, containerName, defaultPath } = providerOptions;
  const blobServiceClient = new BlobServiceClient(`${serviceBaseURL}?${sasToken}`);
  const containerClient = blobServiceClient.getContainerClient(containerName);

  return {
    async upload(file) {
      const blobName = `${defaultPath}/${file.hash}${file.ext}`;
      const blobClient = containerClient.getBlockBlobClient(blobName);
      const buffer = Buffer.from(file.buffer, "binary");
      try {
        await blobClient.upload(buffer, buffer.length);
        file.url = `${serviceBaseURL}/${containerName}/${blobName}?${sasToken}`;
      } catch (error) {
        console.error("Upload error:", error.message, error.details);
        throw error;
      }
    },
    async delete(file) {
      const blobName = `${defaultPath}/${file.hash}${file.ext}`;
      const blobClient = containerClient.getBlockBlobClient(blobName);
      try {
        await blobClient.delete();
      } catch (error) {
        console.error("Delete error:", error.message, error.details);
        throw error;
      }
    },
    async getSignedUrl(file) {
      return {
        url: `${serviceBaseURL}/${containerName}/${defaultPath}/${file.hash}${file.ext}?${sasToken}`,
      };
    },
  };
}