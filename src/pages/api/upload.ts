import formidable from "formidable";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method not allowed" });

  // Use the newer way to initialize formidable
  const form = formidable({});

  try {
    const [fields, files] = await form.parse(req);
    const file = files.file[0]; // Formidable v3 returns an array

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload using the filepath
    const result = await cloudinary.uploader.upload(file.filepath, {
      folder: "text_qanda_images",
    });

    return res.status(200).json({ url: result.secure_url });
  } catch (error) {
    console.error("Upload Logic Error:", error);
    return res.status(500).json({ error: error.message || "Upload failed" });
  }
}
