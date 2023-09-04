const { v2 } = require("cloudinary");
const cloudinary = v2;
const multer = require("multer");
const crypto = require("crypto");

// Cloudinary configuration
cloudinary.config({
  cloud_name: "dbzoknxuw",
  api_key: "238718399477756",
  api_secret: "vhiCSeTnKRQcGRwkApK4r9Cv0Ao",
});

const imageUploader = multer().single("image");

module.exports = (req, res, next) => {
  imageUploader(req, res, function (err) {
    console.log(req.body);
    if (err) {
      return res.status(500).json({ error: "Failed to upload the image." });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No image provided." });
    }

    const fileBuffer = req.file.buffer; // Corrected to req.file.buffer
    const uniquePublicId = `${Date.now()}_${crypto
      .randomBytes(8)
      .toString("hex")}`;

    const uploadStream = cloudinary.uploader.upload_stream(
      { public_id: uniquePublicId },
      function (error, result) {
        if (error) {
          console.error("Cloudinary upload error:", error);
          // Handle the error
          return res.status(500).json({ error: "Cloudinary upload error." });
        } else {
          console.log("Cloudinary upload successful");
          // Handle the successful upload

          const cloudinaryUrl = result.secure_url;
          req.image = cloudinaryUrl;
          console.log(req.image);

          next();
        }
      }
    );

    // Create a readable stream from the buffer and pipe it to the upload stream
    const readableStream = require("stream").Readable.from(fileBuffer);
    readableStream.pipe(uploadStream);
  });
};
