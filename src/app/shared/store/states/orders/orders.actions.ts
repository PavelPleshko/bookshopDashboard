import { Action } from '@ngrx/store';

import {
  IOrdersTable,
  IOrderCommon,
} from './orders.interface';



export const LOAD_ORDERS = '[Orders] Load orders';
export class LoadOrders implements Action {
  readonly type = LOAD_ORDERS;

  constructor(){}
}

export const LOAD_ORDERS_SUCCESS = '[Orders] Load orders success';
export class LoadOrdersSuccess implements Action {
  readonly type = LOAD_ORDERS_SUCCESS;

  constructor(public payload: IOrdersTable) {}
}

export const LOAD_ORDERS_FAIL = '[Orders] Load orders fail';
export class LoadOrdersFail implements Action {
  readonly type = LOAD_ORDERS_FAIL;

  constructor(public error) {}
}


export const ADD_ORDER = '[Orders] Add order';
export class AddOrder implements Action {
  readonly type = ADD_ORDER;

  constructor(public payload) {}
}

export const  ADD_ORDER_SUCCESS= '[Orders] Add order success';
export class AddOrderSuccess implements Action {
  readonly type = ADD_ORDER_SUCCESS;

  constructor(public payload) {}
}

export const ADD_ORDER_FAIL = '[Orders] Add order fail';
export class AddOrderFail implements Action {
  readonly type = ADD_ORDER_FAIL;

  constructor(public error) {}
}


export const REMOVE_ORDER = '[Orders] Remove order';
export class RemoveOrder implements Action {
  readonly type = REMOVE_ORDER;

  constructor(public payload) {}
}

export const  REMOVE_ORDER_SUCCESS= '[Orders] Remove order success';
export class RemoveOrderSuccess implements Action {
  readonly type = REMOVE_ORDER_SUCCESS;

  constructor(public payload) {}
}

export const REMOVE_ORDER_FAIL = '[Orders] Remove order fail';
export class RemoveOrderFail implements Action {
  readonly type = REMOVE_ORDER_FAIL;

  constructor(public error) {}
}


export const CHANGE_ORDER_STATUS = '[Orders] Change order status';
export class ChangeOrderStatus implements Action {
  readonly type = CHANGE_ORDER_STATUS;

  constructor(public payload) {}
}

export const  CHANGE_ORDER_STATUS_SUCCESS= '[Orders] Change order status success';
export class ChangeOrderStatusSuccess implements Action {
  readonly type = CHANGE_ORDER_STATUS_SUCCESS;

  constructor(public payload) {}
}

export const CHANGE_ORDER_STATUS_FAIL = '[Orders] Change order status fail';
export class ChangeOrderStatusFail implements Action {
  readonly type = CHANGE_ORDER_STATUS_FAIL;

  constructor(public error) {}
}

export const  EDIT_ORDER= '[Orders] Edit order';
export class EditOrder implements Action {
  readonly type = EDIT_ORDER;

  constructor(public payload) {}
}

export const  EDIT_ORDER_SUCCESS= '[Orders] Edit order success';
export class EditOrderSuccess implements Action {
  readonly type = EDIT_ORDER_SUCCESS;

  constructor(public payload) {}
}

export const  EDIT_ORDER_FAIL= '[Orders] Edit order fail';
export class EditOrderFail implements Action {
  readonly type = EDIT_ORDER_FAIL;

  constructor(public payload) {}
}

export type All = LoadOrders | LoadOrdersSuccess | LoadOrdersFail 
| AddOrder | AddOrderSuccess | AddOrderFail | EditOrder | EditOrderSuccess
|EditOrderFail | RemoveOrder | RemoveOrderSuccess | RemoveOrderFail 
| ChangeOrderStatus | ChangeOrderStatusSuccess | ChangeOrderStatusFail;