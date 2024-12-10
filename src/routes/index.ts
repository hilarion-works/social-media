import { Router } from 'express';
import Paths from '@src/common/Paths';

import AuthRoutes from './AuthRoutes';
import PostRoutes from './PostRoutes'
import { auth } from '@src/middleware/authAccess'; // middleware to access
import CommentRoutes from './CommentRoutes';
// **** Variables **** //

const apiRouter = Router();

// **** AuthRouter **** //
apiRouter.post(Paths.Login, AuthRoutes.login);

// **** PostRouter **** //
apiRouter.post(Paths.CreatePost, auth, PostRoutes.createPost)
apiRouter.get(Paths.GetPostBy, PostRoutes.getPostBy)
  
// **** PostRouter **** //
apiRouter.post(Paths.CreateComment, auth, CommentRoutes.createComment)
apiRouter.get(Paths.GetComments, CommentRoutes.getComments)

// **** Export default **** //

export default apiRouter;
