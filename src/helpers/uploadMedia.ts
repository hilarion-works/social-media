import ffmpeg from "fluent-ffmpeg";
import ffmpegInstaller from "@ffmpeg-installer/ffmpeg";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import fs from "fs/promises";
import multer from "multer";

ffmpeg.setFfmpegPath(ffmpegInstaller.path);

export function getMediaType(mimeType: string): 'image' | 'video' | null {
    const mimeTypeGroups: Record<string, string[]> = {
      image: [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/bmp',
        'image/tiff',
        'image/svg+xml',
      ],
      video: [
        'video/mp4',
        'video/avi',
        'video/mpeg',
        'video/webm',
        'video/ogg',
        'video/3gpp',
        'video/3gpp2',
      ],
    };
  
    for (const [type, mimeList] of Object.entries(mimeTypeGroups)) {
      if (mimeList.includes(mimeType)) {
        return type as 'image' | 'video';
      }
    }
  
    return null; // Return null if it doesn't match any type
  }

export const compressAndUploadToCloudinary = async (
  inputBuffer: Buffer,
  publicId: string
): Promise<UploadApiResponse> => {
  const tempInputPath = "./temp-input.mp4";
  const tempOutputPath = "./temp-output.mp4";

  try {
    // Save buffer to temporary file
    await fs.writeFile(tempInputPath, inputBuffer);

    // Compress the video using FFmpeg
    await new Promise((resolve, reject) => {
      ffmpeg(tempInputPath)
        .outputOptions([
          "-vcodec libx264",
          "-crf 28",
          "-preset fast",
          "-acodec aac",
          "-b:a 128k",
        ])
        .save(tempOutputPath)
        .on("end", resolve)
        .on("error", reject);
    });

    // Read the compressed file into a buffer
    const compressedBuffer = await fs.readFile(tempOutputPath);

    // Upload to Cloudinary
    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: "video", public_id: publicId },
        (error, result) => {
          if (error) reject(new Error(`Cloudinary Error: ${error.message}`));
          if (!result) reject(new Error("No response from Cloudinary"));
          resolve(result!);
        }
      ).end(compressedBuffer);
    });

    return result;
  } finally {
    // Clean up temporary files
    await fs.unlink(tempInputPath).catch(() => {});
    await fs.unlink(tempOutputPath).catch(() => {});
  }
};

// // Multer configuration for file upload
export const uploadMulter = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
  fileFilter(req, file, callback) {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "video/mp4", "video/mkv"];
    if (!allowedTypes.includes(file.mimetype)) {
      return callback(new Error("Invalid file type. Only images and videos are allowed."));
    }
    callback(null, true);
  },
});