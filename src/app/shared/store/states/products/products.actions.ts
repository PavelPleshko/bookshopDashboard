import { Action } from '@ngrx/store';

import {
  IProductsTable,
  IProductCommon,
} from './products.interface';



export const LOAD_PRODUCTS = '[Products] Load products';
export class LoadProducts implements Action {
  readonly type = LOAD_PRODUCTS;

  constructor(){}
}

export const LOAD_PRODUCTS_SUCCESS = '[Products] Load products success';
export class LoadProductsSuccess implements Action {
  readonly type = LOAD_PRODUCTS_SUCCESS;

  constructor(public payload: IProductsTable) {}
}

export const LOAD_PRODUCTS_FAIL = '[Products] Load products fail';
export class LoadProductsFail implements Action {
  readonly type = LOAD_PRODUCTS_FAIL;

  constructor(public error) {}
}


export const ADD_PRODUCT = '[Products] Add product';
export class AddProduct implements Action {
  readonly type = ADD_PRODUCT;

  constructor(public payload) {}
}

export const  ADD_PRODUCT_SUCCESS= '[Products] Add product success';
export class AddProductSuccess implements Action {
  readonly type = ADD_PRODUCT_SUCCESS;

  constructor(public payload) {}
}

export const ADD_PRODUCT_FAIL = '[Products] Add product fail';
export class AddProductFail implements Action {
  readonly type = ADD_PRODUCT_FAIL;

  constructor(public error) {}
}


export const  EDIT_PRODUCT= '[Products] Edit product';
export class EditProduct implements Action {
  readonly type = EDIT_PRODUCT;

  constructor(public payload) {}
}

export const  EDIT_PRODUCT_SUCCESS= '[Products] Edit product success';
export class EditProductSuccess implements Action {
  readonly type = EDIT_PRODUCT_SUCCESS;

  constructor(public payload) {}
}

export const  EDIT_PRODUCT_FAIL= '[Products] Edit product fail';
export class EditProductFail implements Action {
  readonly type = EDIT_PRODUCT_FAIL;

  constructor(public payload) {}
}

export type All = LoadProducts | LoadProductsSuccess | LoadProductsFail 
| AddProduct | AddProductSuccess | AddProductFail | EditProduct | EditProductSuccess
|EditProductFail;