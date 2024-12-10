/**
 * Express router paths go here.
 */


export default {
  Base: '/',
  CreatePost: '/create-post',
  GetPostBy: '/get-post?:query',
  CreateComment: '/create-comment',
  GetComments: '/get-comments?:query',
  Login: '/login',
} as const;
