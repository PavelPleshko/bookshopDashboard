import { Action } from '@ngrx/store';

import {
  ICustomerGroupTable,
  ICustomerGroup,
} from './customers-groups.interface';



export const LOAD_CUSTOMERS_GROUPS = '[Customer_groups] Load customer groups';
export class LoadCustomerGroups implements Action {
  readonly type = LOAD_CUSTOMERS_GROUPS;

  constructor() {}
}

export const LOAD_CUSTOMERS_GROUPS_SUCCESS = '[Customer_groups] Load customer groups success';
export class LoadCustomerGroupsSuccess implements Action {
  readonly type = LOAD_CUSTOMERS_GROUPS_SUCCESS;

  constructor(public payload: ICustomerGroupTable) {}
}

export const LOAD_CUSTOMERS_GROUPS_FAIL = '[Customer_groups] Load customer groups fail';
export class LoadCustomerGroupsFail implements Action {
  readonly type = LOAD_CUSTOMERS_GROUPS_FAIL;

  constructor(public error) {}
}

export const ADD_CUSTOMERS_GROUP = '[Customer_groups] Add customer group';
export class AddCustomerGroup implements Action {
  readonly type = ADD_CUSTOMERS_GROUP;

  constructor(public payload:ICustomerGroup) {}
}

export const ADD_CUSTOMERS_GROUP_SUCCESS = '[Customer_groups] Add customer group success';
export class AddCustomerGroupSuccess implements Action {
  readonly type = ADD_CUSTOMERS_GROUP_SUCCESS;

  constructor(public payload:ICustomerGroup) {}
}


export const ADD_CUSTOMERS_GROUP_FAIL = '[Customer_groups] Add customer group fail';
export class AddCustomerGroupFail implements Action {
  readonly type = ADD_CUSTOMERS_GROUP_FAIL;

  constructor(public error) {}
}


export type All = LoadCustomerGroups 
 | LoadCustomerGroupsSuccess
 | LoadCustomerGroupsFail
 | AddCustomerGroup
 | AddCustomerGroupSuccess
 | AddCustomerGroupFail;