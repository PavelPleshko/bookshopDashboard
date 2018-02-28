import { Action } from '@ngrx/store';

import {
  IUpdatesTable,
  IUpdateCommon,
} from './updates.interface';



export const LOAD_UPDATES = '[Updates] Load Updates';
export class LoadUpdates implements Action {
  readonly type = LOAD_UPDATES;

  constructor(){}
}

export const LOAD_UPDATES_SUCCESS = '[Updates] Load Updates success';
export class LoadUpdatesSuccess implements Action {
  readonly type = LOAD_UPDATES_SUCCESS;

  constructor(public payload: IUpdatesTable) {}
}

export const LOAD_UPDATES_FAIL = '[Updates] Load Updates fail';
export class LoadUpdatesFail implements Action {
  readonly type = LOAD_UPDATES_FAIL;

  constructor(public error) {}
}




export type All = LoadUpdates | LoadUpdatesSuccess | LoadUpdatesFail;