import lodash from 'lodash';

import HttpStatusCodes from '@src/common/HttpStatusCodes';
import SessionUtil from '@src/util/SessionUtil';
import AuthController from '@src/controllers/AuthController';

import { IReq, IRes } from './common/types';
import response from '@src/util/response/response';
import { UserReqBody } from '@src/types/types';

// **** Functions **** //
/**
 * Login a user.
 */
async function login(req: IReq, res: IRes) {
  try {
    const reqBody = req.body as UserReqBody
    const username = reqBody.username
    const password = reqBody.password
    if (lodash.isEmpty(username) || lodash.isEmpty(password)) {
      return response.error("username or password cannot be empty", res, 401)
    }
    
    const result = await AuthController.login(username, password);
    if (result.flag === 200) {
      const dataResponse = {
        token: result.token
      }
      return response.success('success', res, dataResponse)
    } else {
      return response.error(result.message, res, result.flag)
    }
  } catch (error) {
    return response.serverError("Server error", res, 500)
  }
  // res.status(HttpStatusCodes.OK).end();
}

// **** Export default **** //

export default {
  login,
} as const;
