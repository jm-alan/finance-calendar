import type { Dispatch } from 'redux';
import csrfetch from './csrfetch';

const GET_ALL_ITEMS = 'items/ALL';
const CREATE_ITEM = 'items/CREATE';
const UPDATE_ITEM = 'items/UPDATE';
const DELETE_ITEM = 'items/DELETE';
const APPEND_ITEM_BY_DATE = 'items/APPEND_BY_DATE';
const REMOVE_ITEM_BY_DATE = 'items/REMOVE_BY_DATE';

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

const appendItemsByDate = (items: ExtantItemCollection, date: string): ItemAction => ({
  type: APPEND_ITEM_BY_DATE,
  items,
  date
});

export const RemoveItemsByDate = (date: string): ItemAction => ({
  type: REMOVE_ITEM_BY_DATE,
  date
});

export const GetItems = (accountId: number) => async (dispatch: Dispatch<ItemAction>) => {
  const { items } = await csrfetch.get(`/api/accounts/${accountId}/items/`);
  dispatch(loadItems(items));
};

export const GetItemsByDate = (accountId: number, date: string) => async (dispatch: Dispatch<ItemAction>) => {
  const { items } = await (accountId ? csrfetch.get(`/api/accounts/${accountId}/items/${date}/`) : csrfetch.get(`/api/items/${date}/`));
  dispatch(appendItemsByDate(items, date));
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
  state: ItemState = { all: {}, byDate: {}, lock: 0 },
  { type, item, items, id, date }: ItemAction
): ItemState {
  switch (type) {
    case GET_ALL_ITEMS:
      if (!items) return state;
      return {
        ...state,
        all: items
      };
    case APPEND_ITEM_BY_DATE:
      if (!date || !items) return state;
      return {
        ...state,
        byDate: {
          ...state.byDate,
          [date]: items
        },
        lock: state.lock + 1
      };
    case REMOVE_ITEM_BY_DATE:
      if (!date) return state;
      delete state.byDate[date];
      return {
        ...state,
        byDate: {
          ...state.byDate
        },
        lock: state.lock - 1
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
