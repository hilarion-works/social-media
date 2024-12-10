require('dotenv').config()

import config from "config"
import JWT from "jsonwebtoken"
import express, { Request, Response, NextFunction } from 'express';
import flag from "@src/util/flag/errorCode.js"
import response from "@src/util/response/response"
import { User } from "@src/models"
import UserRepo from "@src/repos/UserRepo";
import { IReq, IRes } from "@src/routes/common/types";

type Decoded = { 
  id: number;
  role_id: number,
  iat: number,
  exp: number 
}

export const auth = async (req: IReq, res: IRes, next: NextFunction) => {
  try {
    if (req.header('Authorization') !== undefined && req.header('Authorization') !== null) {
      const tokenHeader = req.header('Authorization')!.split(' ');
      const tokenType = tokenHeader[0];
      const token = tokenHeader[1];
      
      if (tokenHeader.length > 2 || tokenType !== 'Bearer' || !token ) return response.unauthorized('Unauthorized access. Please contact our technical support.',res, 400);
      const decoded = JWT.verify(token, process.env.JWT_SECRET ?? "" ) as Decoded;
      
      const user = await UserRepo.getUserById(decoded.id)
      if (!user) return response.invalidInput('No User Found from this token id', res, 404);
      req.user = user.dataValues
    } else {
      return response.unauthorized('Unauthorized access. Please contact our technical support.',res, 400);
    }
  } catch (error) {
    return response.error(error.message, res, 500);
  }
  next();
};

