import { v2 as cloudinary, v2 } from 'cloudinary';
import sharp from "sharp";
import { Sequelize } from "sequelize";

import { Post, User } from "@src/models";
import { PostReqBody } from "@src/types/types";
import { responseData } from "@src/global/data";

import { compressAndUploadToCloudinary } from '@src/helpers/uploadMedia';

async  function uploadMedia (file: any, dataReq: PostReqBody): Promise<any> {
  try {
    let compressedBuffer,
        dataURI,
        cldyRes
    let b64 = ""
    if (dataReq.media_type === "image") {
        compressedBuffer = await sharp(file.buffer)
        .resize(dataReq.media_width, dataReq.media_height, { fit: "inside" }) // Resize to fit within 800x800
        .toFormat("webp") // Convert to webp for better compression
        .webp({ quality: 80 }) // Set quality
        .toBuffer();
        b64 = Buffer.from(compressedBuffer).toString("base64");

        dataURI = "data:" + file.mimetype + ";base64," + b64;
        cldyRes = await v2.uploader.upload(dataURI, {
          resource_type: "auto",
        });
    } else if (dataReq.media_type === "video"){
      compressedBuffer = await compressAndUploadToCloudinary(file.buffer, "compressed_video");
      cldyRes = compressedBuffer
    } else {
      responseData.message = "File is incorrect format"
      responseData.flag = 400
      return responseData
    }

    dataReq.media_url = cldyRes!.url
    dataReq.media_width = cldyRes!.width
    dataReq.media_height = cldyRes!.height
    const posted = await Post.create(dataReq)
    if (posted) {
      responseData.message = "Post has been successfully created"
      responseData.flag = 200
      const dataResp = {
        id: posted.id,
        caption: posted.caption,
        is_private: posted.is_private,
        media_url: posted.media_url,
        media_type: posted.media_type,
        media_width: posted.media_width,
        media_height: posted.media_height,
        created_at: posted.created_at,
      }
      responseData.data = dataResp
      return responseData;
    } else {
      responseData.message = "Something error with our server"
      responseData.flag = 301
      return responseData
    }
  } catch (error) {
    responseData.message = error
    responseData.flag = 500
    return responseData
  }    
}

async function getPostBy (postId: number): Promise<any> {
  try {
    const result = await Post.findByPk(postId, {
      attributes: [
        'id',
        'caption',
        'media_url',
        'media_type',
        'media_width',
        'media_height',
        'is_private',
        'user_id',
        'created_at',
        'updated_at',
        [Sequelize.col('user.username'), 'user_username'],
        [Sequelize.col('user.avatar'), 'user_avatar'],
        [Sequelize.col('user.name'), 'user_name'],
        [Sequelize.col('user.id'), 'user_id'],
      ],
      include: [
        {
          model: User,
          as: 'user',
          attributes: []
        }
      ]
    })
    
    if (result) {
      responseData.message = "Post has been successfully created"
      responseData.flag = 200
      responseData.data = result
      return responseData;
    } else {
      responseData.message = "Post not found"
      responseData.flag = 404
      return responseData
    }
  } catch (error) {
    responseData.message = error
    responseData.flag = 500
    return responseData
  }
}

export default {
    uploadMedia,
    getPostBy,
  } as const;
  
