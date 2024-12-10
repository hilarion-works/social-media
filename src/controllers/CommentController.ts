import _ from 'lodash'
import { Comment, Post, User } from "@src/models";
import { responseData } from "@src/global/data";
import Sequelize, { Op } from "sequelize";
import { generateNextCursor, getTotalComments } from '@src/helpers/CommentData';

async function createComment (postId: number, userId: number, content: string): Promise<any> {
  try {
    const dataComment = {
      post_id: postId,
      user_id: userId,
      content: content,
      created_at: new Date,
      updated_at: new Date,
    }
    const result = await Comment.create(dataComment)
    
    if (result) {
      responseData.message = "Post has been successfully created"
      responseData.flag = 200
      responseData.data = result
      return responseData;
    } else {
      responseData.message = "Comment cannot be created"
      responseData.flag = 301
      return responseData
    }
  } catch (error) {
    responseData.message = error
    responseData.flag = 500
    return responseData
  }
}

async function getComments (postId: number, createdAt: string, limit: number): Promise<any> {
  try {
    // Query conditions
    const whereCondition: any = {};
    if (_.isNull(createdAt)) {
      whereCondition.created_at = { created_at: { [Op.lt]: createdAt }};
    }

    const respData = await Post.findOne({
      where: { id: postId },
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
      ],
      include: [
        {
          model: User,
          as: 'user',
          attributes: [],
        },
        {
          model: Comment,
          as: 'comments',
          attributes: [
            'id',
            'post_id',
            'content',
            'created_at',
            [Sequelize.col('user_comment.username'), 'user_username'],
            [Sequelize.col('user_comment.avatar'), 'user_avatar'],
            [Sequelize.col('user_comment.name'), 'user_name'],
            [Sequelize.col('user_comment.id'), 'user_id'],
          ],
          include: [
            {
              model: User,
              as: 'user_comment',
              attributes: [],
            },
          ],
          where: whereCondition,
          order: [['created_at', 'DESC']],
          limit: limit,
          separate: true,
        },
      ],
    });
    
    // Prepare next cursor
    const nextCursor = generateNextCursor(respData, limit)
    const totalData = getTotalComments(respData)
    
    const result = {
      data: respData,
      next_cursor: nextCursor,
      total: totalData
    }
    if (respData) {
      responseData.message = "Post has been successfully created"
      responseData.flag = 200
      responseData.data = result
      return responseData;
    } else {
      responseData.message = "Comment cannot be created"
      responseData.flag = 301
      return responseData
    }
  } catch (error) {
    responseData.message = error
    responseData.flag = 500
    return responseData
  }
}


export default {
    createComment,
    getComments,
  } as const;
  
