/**
 * Shared types for routes.
 */

import { UserModel } from '@src/types/types';
import { Response, Request } from 'express';
// import { ISessionUser } from '@src/models/Sks';


// **** Express **** //
export interface IReq extends Request {
  user?: UserModel;
}


interface ILocals {
  // sessionUser: ISessionUser;
}

export type IRes = Response<unknown, ILocals>;
