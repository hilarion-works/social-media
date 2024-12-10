import UserRepo from '@src/repos/UserRepo';

import PwdUtil from '@src/util/PwdUtil';
import { tick } from '@src/util/misc';

import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { RouteError } from '@src/common/classes';

import { User } from '@src/models';
import { generatePassword, checkPassword } from '@src/helpers/password'
import { generateToken } from '@src/helpers/jwtToken'
import { UserModel } from '@src/types/types';

// **** Variables **** //

// Errors
export const Errors = {
  Unauth: 'Unauthorized',
  EmailNotFound(email: string) {
    return `User with email "${email}" not found`;
  },
} as const;


// **** Functions **** //

/**
 * Login a user.
 */
async function login(username: string, password: string): Promise<any> {
  let responseData = {
    message: "",
    flag: 0,
    token: ""
  }
  try {
    const existingUser = await User.findOne({ where: { username } });
    if (!existingUser) {
      const newPassword = await generatePassword(username, password)
        const userCreate = await User.create({
          username: username,
          password: newPassword,
          name: '',
          email: '',
          level: 0,
          avatar: '',
          created_at: new Date,
          updated_at: new Date,
        })
        const token = generateToken({id: userCreate.id, level: userCreate.level})
        responseData.message = "Access granted"
        responseData.flag = 200
        responseData.token = token
        return responseData;
    }
    const statusCheck = await checkPassword(password, existingUser.password, existingUser.username)
    
    if (statusCheck) {
      const token = generateToken({id: existingUser.id, level: existingUser.level})
      responseData.message = "Access granted"
      responseData.flag = 200
      responseData.token = token
      return responseData;
    } else {
      responseData.message = "Incorrect password, please use the correct one"
      responseData.flag = 401
      return responseData
    }
  } catch (error) {
    responseData.message = error
    responseData.flag = 500
    return responseData
  }
}
// **** Export default **** //

export default {
  login,
} as const;
