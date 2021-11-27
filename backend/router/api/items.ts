import type { AuthenticatedRequest } from '../../utils/types';

import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import restoreOrReject from '../../utils/restoreOrReject';

const router = Router();

router.get(
  '/',
  restoreOrReject,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const { user } = req;
    const items = (await user.getItems()).toKeyedObject('id');
    res.json({ items });
  })
);

export default router;
