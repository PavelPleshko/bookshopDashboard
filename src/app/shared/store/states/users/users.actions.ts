import { Action } from '@ngrx/store';

import {
  IUsersTable,
  IUserCommon,
} from './users.interface';



export const LOAD_USERS = '[Users] Load users';
export class LoadUsers implements Action {
  readonly type = LOAD_USERS;

  constructor() {}
}

export const LOAD_USERS_SUCCESS = '[Users] Load users success';
export class LoadUsersSuccess implements Action {
  readonly type = LOAD_USERS_SUCCESS;

  constructor(public payload: IUsersTable) {}
}

export const LOAD_USERS_FAIL = '[Users] Load users fail';
export class LoadUsersFail implements Action {
  readonly type = LOAD_USERS_FAIL;

  constructor(public error) {}
}


export const UPDATE_USER_GROUP = '[Users] Update user group';
export class UpdateUserGroup implements Action {
  readonly type = UPDATE_USER_GROUP;

  constructor(public payload) {}
}

export const  UPDATE_USER_GROUP_SUCCESS= '[Users] Update user group success';
export class UpdateUserGroupSuccess implements Action {
  readonly type = UPDATE_USER_GROUP_SUCCESS;

  constructor(public payload) {}
}

export const UPDATE_USER_GROUP_FAIL = '[Users] Update user group fail';
export class UpdateUserGroupFail implements Action {
  readonly type = UPDATE_USER_GROUP_FAIL;

  constructor(public error) {}
}

export type All = LoadUsers | LoadUsersSuccess | LoadUsersFail | UpdateUserGroup
|UpdateUserGroupSuccess | UpdateUserGroupFail;