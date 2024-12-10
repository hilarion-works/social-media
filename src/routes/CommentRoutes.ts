import _ from 'lodash';
import { IReq, IRes } from './common/types';
import response from '@src/util/response/response';
import { Post } from '@src/models';
import CommentController from '@src/controllers/CommentController';

// **** Functions **** //

/**
 * Create Comment.
 */
async function createComment(req: IReq, res: IRes) {
  try {
    const postId = Number(req.body.post_id)
    const content = req.body.content
    const userId = Number(req.user?.id)
    if (_.isNull(postId) || _.isNull(content)) {
      return response.error("All field cannot be empty", res, 400)
    }
    const postData = await Post.findByPk(postId)
    if (!postData) return response.error("Post not found", res, 404)
    
    const result = await CommentController.createComment(postId, userId, content)
    if (result.flag === 200) {
      return response.success('success', res, result.data)
    } else {
      return response.error(result.message.toString(), res, result.flag)
    }
  } catch (error) {
    return response.serverError(error.message, res, 500)
  }
}


/**
 * Get Comments from post.
 */
async function getComments(req: IReq, res: IRes) {
  try {
    const postId = Number(req.query.postId)
    const cursor = req.query.cursor ? req.query.cursor?.toString() : "" // example cursor data "2024-12-10T11:04:38Z"
    const limit = 5 // limit load data

    if (_.isNull(postId)) {
      return response.error("Please fill the post id", res, 400)
    }
    const postData = await Post.findByPk(postId)
    if (!postData) {
      return response.error("Post not found", res, 404)
    }
    const result = await CommentController.getComments(postId, cursor, limit)
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
  createComment,
  getComments,
} as const;
