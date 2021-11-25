import User from '../db/models/user';
import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
  user: User
}
