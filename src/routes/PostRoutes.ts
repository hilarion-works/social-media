import _ from 'lodash';
import multer from "multer";
import { IReq, IRes } from './common/types';
import response from '@src/util/response/response';
import { PostReqBody, UserReqBody } from '@src/types/types';
import PostController from "@src/controllers/PostController"
import { getMediaType, uploadMulter } from '@src/helpers/uploadMedia';

// **** Functions **** //

/**
 * Create Post.
 */
async function createPost(req: IReq, res: IRes) {
  try {
    // Single file upload
    const uploader = uploadMulter.single("file");
    uploader(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err.message });
      }
      if (!req.file) {
        return response.error("No file uploaded.", res, 400)
      }
      const file = req.file;
      const mediaType = getMediaType(file.mimetype)
      const userId = req.user!.id as number
      const caption = req.body.caption
      const isPrivate = req.body.is_private

      const isExistingUser = req.user
      if (!isExistingUser) {
        return response.error("User is not existed, please login first", res, 402)
      }
      
      if (_.isNull(userId) || _.isEmpty(isPrivate) || _.isEmpty(caption)) {
        return response.error("All field cannot be empty", res, 400)
      }
      
      const dataReq: PostReqBody = {
        user_id: userId,
        caption: caption,
        media_url: "",
        is_private: isPrivate,
        media_type: mediaType,
        media_width: 800,
        media_height: 800,
        created_at: new Date,
        updated_at: new Date,
      }
      const result = await PostController.uploadMedia(file, dataReq)
      
      if (result.flag === 200) {
        return response.success('success', res, result.data)
      } else {
      return response.error(result.message.toString(), res, result.flag)
      }
    })
  } catch (error) {
    return response.serverError(error.message, res, 500)
  }
}

/**
 * Getting Post By, this function can be scale up by other than postId e.g. postName, etc.
 */
async function getPostBy(req: IReq, res: IRes) {
  try {
    const postId = Number(req.query.postId)
    if (_.isNull(postId) || !_.isNumber(postId)) {
      return response.error("Please fill the post id", res, 400)
    }
    const result = await PostController.getPostBy(postId)
    
    if (result.flag === 200) {
      return response.success('success', res, result.data)
    } else {
      return response.error(result.message.toString(), res, result.flag)
    }
  } catch (error) {
    return response.serverError(error.message, res, 500)
  }
}

// **** Export default **** //

export default {
  createPost,
  getPostBy,
} as const;
