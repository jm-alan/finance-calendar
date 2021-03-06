import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import User from '../../db/models/user';
import createToken from '../../utils/createToken';
import restoreUser from '../../utils/restoreUser';
import { environment, jwtConfig } from '../../config';
import { AuthenticatedRequest } from '../../utils/types';

const router = Router();

router.delete('/', (_req, res) => {
  res.clearCookie('token').status(200).json({});
});

router.post('/', asyncHandler(async (req, res) => {
  const { body: { email, password } } = req;
  const user = await User.LogIn({ email, password });
  const token = createToken(user.id);
  const isProduction = environment === 'production';
  res.cookie('token', token, {
    maxAge: jwtConfig.expiresIn * 1000,
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction
  });
  res.json({ user });
}));

router.get('/', restoreUser, (req: AuthenticatedRequest, res) => {
  const user = req.user && req.user.info;
  res.json({ user });
});

export default router;
