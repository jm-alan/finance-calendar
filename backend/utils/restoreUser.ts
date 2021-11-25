import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { jwtConfig } from '../config';
import User from '../db/models/user';
import { AuthenticatedRequest } from './types';

interface JwtPayload {
  userId: number
}

export default async function (req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const { cookies: { token } } = req;
  try {
    const { userId } = verify(token, jwtConfig.secret) as JwtPayload;
    req.user = await User.findByPk(userId);
    req.user ?? res.clearCookie('token');
    next();
  } catch (err) {
    next();
  }
}
