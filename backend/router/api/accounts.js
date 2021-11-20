import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import restoreOrReject from '../../utils/restoreOrReject';

const router = Router();

router.get('/', restoreOrReject, asyncHandler(async (req, res) => {
  const { user } = req;
  const accounts = await user.getAccounts();
  res.json({ accounts });
}));

router.get('/:id(\\d+)/items', restoreOrReject, asyncHandler(async (req, res) => {
  const { user, params: { id } } = req;
  const account = await user.findAccountByPk(id);
  if (!account) {
    res.status(404).json({
      errors: [
        'An account with that ID belonging to this user was not found in the database.'
      ]
    });
  }

  const items = (await account.getItems()).toKeyedObject('id');
  res.json({ items });
}));

export default router;
