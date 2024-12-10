import express, { Request, Response, NextFunction } from 'express';
import JWT from "jsonwebtoken"
import config from 'config'
import response from '@src/util/response/response';
import flag from '@src/util/flag/errorCode'

export const checkToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (req.header('Authorization') !== undefined && req.header('Authorization') !== null) {
            const tokenHeader = req.header('Authorization')!.split(' ');
            const tokenType = tokenHeader[0];
            const token = tokenHeader[1];

            if (tokenHeader.length > 2 || tokenType !== 'Bearer' || !token ) return response.unauthorized('Unauthorized access. Please contact our technical support.',res, 401);
            try {
                const decoded = JWT.verify(token, process.env.JWT_SECRET ?? "");
                // // const user = await AccountUser.findOne({ where:{id: decoded.id }});
                // if (!user) return response.invalidInput('No User Found from this token id', res, flag.jwt_token_notmatch);
                // req.user = user.dataValues
            } catch (error) {
                return response.unauthorized('Unauthorized access. Please contact our technical support.', res, 402);
            }
            next();
        } else {
            response.unauthorized("no auth existed", res, 402)
        }
    } catch (e) {
        throw e;
    }

}