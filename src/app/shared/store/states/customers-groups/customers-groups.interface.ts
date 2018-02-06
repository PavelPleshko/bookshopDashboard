import {IUsersTable} from '../users/users.interface';

export interface ICustomerGroup {
  id: string;
  title: string;
  style:string;
  users:IUsersTable | any;
  description?:string;
  createdAt:string;
}

export interface ICustomerGroupTable{
 	byId: { [key: string]: ICustomerGroup };
	allIds: string[];
}

export interface ICustomerGroupArray extends Array<ICustomerGroup>{
}

export interface ICustomerGroupState{
data:ICustomerGroupTable;
loading:boolean;
loaded:boolean;
}
