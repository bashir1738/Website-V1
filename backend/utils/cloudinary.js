const cloudinary = require('cloudinary').v2;
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a file buffer to Cloudinary.
 *
 * @param {Buffer} fileBuffer  - File content as a Buffer.
 * @param {string} folder      - Destination folder inside Cloudinary.
 * @param {'image'|'raw'|'video'} resourceType
 *   - Explicit resource type. Do NOT use 'auto'; callers must declare the
 *     expected type so Cloudinary rejects unexpected content.
 *     Use 'image' for photos, 'raw' for PDFs/DOCX, 'video' for video.
 */
const uploadToCloudinary = async (fileBuffer, folder = 'blockfuse', resourceType = 'image') => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(fileBuffer);
  });
};

module.exports = { cloudinary, uploadToCloudinary };
