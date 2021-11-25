import { NextFunction, Response } from 'express';
import { RequestError } from '../RequestError';
import { AuthenticatedRequest } from './types';

export default function (req: AuthenticatedRequest, _res: Response, next: NextFunction) {
  if (req.user) return next();

  const err = new RequestError(
    'Unauthorized',
    'You must be logged in to access this resource',
    401
  );
  next(err);
}
