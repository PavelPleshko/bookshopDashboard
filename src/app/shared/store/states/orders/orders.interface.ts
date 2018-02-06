import {IUserCommon} from '../users/users.interface';
import {IProductCommon} from '../products/products.interface';


export interface IOrderCommon {
  id: number;
  buyer:string;
  products:Array<string>;
  status:'submitted' | 'awaiting payment' |'finalized' | 'cancelled';
  createdAt:Date;
  amount:number;
  total:number;
}


export interface IOrderPopulated {
  id: number;
  buyer:IUserCommon;
  products: Array<IProductCommon>;
  status:'submitted' | 'awaiting payment' |'finalized';
  createdAt:Date;
  amount:number;
  total:number;
}

export interface IOrdersTable{
	
 	byId: { [key: string]: IOrderCommon };
	allIds: string[];
}

export interface IOrdersArray extends Array<IOrderCommon>{
}

export interface IOrdersPopulatedArray extends Array<IOrderPopulated>{
}

export interface IOrdersState{
data:IOrdersTable;
loading:boolean;
loaded:boolean;
}