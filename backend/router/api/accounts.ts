import { Router } from 'express';
import asyncHandler from 'express-async-handler';
import { AuthenticatedRequest } from '../../utils/types';
import restoreOrReject from '../../utils/restoreOrReject';

const router = Router();

router.get(
  '/',
  restoreOrReject,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const { user } = req;
    const accounts = (await user.getAccounts()).toKeyedObject('id');
    res.json({ accounts });
  })
);

router.get(
  '/:id(\\d+)/items',
  restoreOrReject,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const { user, params: { id } } = req;
    const account = await user.findAccountByPk(+id);
    if (!account) {
      return res.status(404).json({
        errors: [
          'An account with that ID belonging to this user was not found in the database.'
        ]
      });
    }

    const items = (await account.getItems()).toKeyedObject('id');
    res.json({ items });
  })
);

router.get(
  '/:id(\\d+)/items/:month(\\d+)/:day(\\d+)/:year(\\d+)/',
  restoreOrReject,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const { user, params: { id, month, day, year } } = req;
    const account = await user.findAccountByPk(+id);
    if (!account) {
      return res.status(404).json({
        errors: [
          'An account with that ID belonging to this user was not found in the database.'
        ]
      });
    }

    const items = (await account.getItems({ where: { date_expected: `${month}/${day}/${year}` } })).toKeyedObject('id');
    res.json({ items });
  })
);

router.post(
  '/:id(\\d+)/items/',
  restoreOrReject,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const { user, body, params: { id } } = req;
    const account = await user.findAccountByPk(+id);
    if (!account) {
      return res.status(404).json({
        errors: [
          'An account with that ID belonging to this user was not found in the database.'
        ]
      });
    }

    const item = await account.createItem(body);
    res.json({ item });
  })
);

router.patch(
  '/:accountId(\\d+)/items/:itemId(\\d+)/',
  restoreOrReject,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const { user, body, params: { accountId, itemId } } = req;
    const account = await user.findAccountByPk(+accountId);
    if (!account) return res.status(404).json({
      errors: [
        'An account with that ID belonging to this user was not found in the database.'
      ]
    });
    const item = await account.findItemByPk(+itemId);
    if (!item) return res.status(404).json({
      errors: [
        'An item with that ID belonging to this account was not found in the database.'
      ]
    });
    const validKeys = [
      'name', 'amount', 'is_expense', 'date_expected',
      'is_recurring', 'description', 'category'
    ];
    const bodyKeys = Object.keys(body);
    for (const bodyKey of bodyKeys) {
      if (!validKeys.some(validKey => validKey === bodyKey)) delete body[bodyKey];
    }
    for (const key of validKeys) body[key] ??= '';
    await item.update(body);
  })
);

router.delete(
  '/:accountId(\\d+)/items/:itemId(\\d+)/',
  restoreOrReject,
  asyncHandler(async (req: AuthenticatedRequest, res) => {
    const { user, params: { accountId, itemId } } = req;
    const account = await user.findAccountByPk(+accountId);
    if (!account) return res.status(404).json({
      errors: [
        'An account with that ID belonging to this user was not found in the database.'
      ]
    });
    const item = await account.findItemByPk(+itemId);
    if (!item) return res.status(404).json({
      errors: [
        'An item with that ID belonging to this account was not found in the database.'
      ]
    });
    await item.destroy();
    res.sendStatus(200);
  })
);

export default router;
