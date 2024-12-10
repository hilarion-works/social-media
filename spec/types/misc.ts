import { Response } from 'supertest';
import { IUser } from '@src/models/Sks';


// Misc
export type TReqBody = Record<string, unknown>;
export type TRes = Omit<Response, 'body'> & { body: {
  error?: string;
  user?: IUser
  users?: IUser[]
}};
export type TApiCb = (res: TRes) => void;
