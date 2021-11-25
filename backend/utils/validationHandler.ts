import { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'sequelize';
import { ExtendedValidationError } from '../RequestError';

export default (err: Error | ValidationError, _req: Request, _res: Response, next: NextFunction) => {
  if (err instanceof ValidationError) {
    const errOut = new ExtendedValidationError('Validation Error', err.message);
    errOut.errors = err.errors.map(e => e.message);
    return next(errOut);
  } else return next(err);
};
