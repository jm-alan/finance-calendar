import type { Dispatch } from 'redux';
import csrfetch from './csrfetch';

const GET_ALL_ITEMS = 'items/ALL';
const CREATE_ITEM = 'items/CREATE';
const UPDATE_ITEM = 'items/UPDATE';
const DELETE_ITEM = 'items/DELETE';

const loadItems = (items: ExtantItemCollection): ItemAction => ({
  type: GET_ALL_ITEMS,
  items
});

const createItem = (item: ExtantItem): ItemAction => ({
  type: CREATE_ITEM,
  item
});

const updateItem = (item: ExtantItem): ItemAction => ({
  type: UPDATE_ITEM,
  item
});

const deleteItem = (id: number): ItemAction => ({
  type: DELETE_ITEM,
  id
});

export const GetItems = (accountId: number) => async (dispatch: Dispatch<ItemAction>) => {
  const { items } = await csrfetch.get(`/api/${accountId}/items/`);
  dispatch(loadItems(items));
};

export const CreateItem = (newItem: NewItem, accountId: number) => async (dispatch: Dispatch<ItemAction>) => {
  const { item } = await csrfetch.post(`/api/accounts/${accountId}/items/`, newItem);
  dispatch(createItem(item));
};

export const UpdateItem = (updatedItem: NewItem, accountId: number, itemId: number,) => async (dispatch: Dispatch<ItemAction>) => {
  const { item } = await csrfetch.patch(`/api/accounts/${accountId}/items/${itemId}`, updatedItem);
  dispatch(updateItem(item));
};

export const DeleteItem = (accountId: number, itemId: number) => async (dispatch: Dispatch<ItemAction>) => {
  await csrfetch.destroy(`/api/accounts/${accountId}/items/${itemId}/`);
  dispatch(deleteItem(itemId));
};

export default function reducer (
  state: ItemState = { all: {}, loaded: false },
  { type, item, items, id }: ItemAction
): ItemState {
  switch (type) {
    case GET_ALL_ITEMS:
      return {
        ...state,
        all: items
      };
    case CREATE_ITEM:
      if (!item) return state;
      return {
        ...state,
        all: {
          ...state.all,
          [item.id]: item
        }
      };
    case UPDATE_ITEM:
      if (!item) return state;
      return {
        ...state,
        all: {
          ...state.all,
          [item.id]: item
        }
      };
    case DELETE_ITEM:
      if (!id) return state;
      return {
        ...state,
        all: {
          ...state.all,
          [id]: null
        }
      };
    default:
      return state;
  }
}
