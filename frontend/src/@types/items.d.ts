declare type ExtantItem = {
  id: number;
  name: string;
  is_expense: boolean;
  description: string;
  date_expected: Date;
  is_recurring: boolean;
  amount: number;
  category: string;
  user_id: number;
  account_id: number;
  createdAt: Date;
  updatedAt: Date;
};

declare type NewItem = {
  name: string;
  is_expense: boolean;
  description: string;
  date_expected: Date;
  is_recurring: boolean;
  amount: number;
  category: string;
};

declare type ExtantItemCollection = {
  [key: number | string]: ExtantItem | null;
};

declare type ItemState = {
  all: ItemCollection;
  lock: number;
};

declare type ItemAction = {
  type: 'items/ALL' | 'items/CREATE' | 'items/UPDATE' | 'items/DELETE' | 'items/BY_DATE';
  item?: ExtantItem;
  items?: ExtantItemCollection;
  id?: number;
  date?: string;
};
