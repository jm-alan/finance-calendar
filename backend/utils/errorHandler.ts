import { ExtendedValidationError, RequestError } from '../RequestError';
import { environment } from '../config';
import { AuthenticatedRequest } from './types';
import { NextFunction, Response } from 'express';

const isProduction = environment === 'production';

export default (err: Error | RequestError | ExtendedValidationError, _req: AuthenticatedRequest, res: Response, _next: NextFunction) => {
  if (err instanceof RequestError || err instanceof ExtendedValidationError) res.status(err.status);
  else res.status(500);
  console.error(err);
  res.json({
    title: (
      err instanceof RequestError ||
      err instanceof ExtendedValidationError
    )
      ? err.title
      : 'Server Error',
    message: ((
      err instanceof RequestError ||
      err instanceof ExtendedValidationError
    ) && err.message) || null,
    errors: ((
      err instanceof RequestError ||
        err instanceof ExtendedValidationError
    ) && err.errors
    ) || null,
    stack: isProduction || (err instanceof Error && err.stack)
  });
};
