
export type SUBMIT_ORDER  = 'submit_order';
export type PAYED_ORDER = 'payed_order';
export type CANCELLED_ORDER = 'cancelled_order';
export type LEFT_MESSAGE = 'left_message';
export type REGISTERED = 'registered';



export interface IUpdateCommon {
  id: string;
  user:string;
  target?:string;
  type:SUBMIT_ORDER | PAYED_ORDER | CANCELLED_ORDER | LEFT_MESSAGE | REGISTERED;
  timestamp:Date;
}


export interface IUpdatesTable{
	
 	byId: { [key: string]: IUpdateCommon };
	allIds: string[];
}

export interface IUpdatesArray extends Array<IUpdateCommon>{
}

export interface IUpdatesState{
data:IUpdatesTable;
loading:boolean;
loaded:boolean;
}