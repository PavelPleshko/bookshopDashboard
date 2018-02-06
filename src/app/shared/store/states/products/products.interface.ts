


export interface IProductCommon {
  id: string;
  title: string;
  authors:Array<string>;
  description:string;
  thumbnail: string;
  topics:Array<string>;
  price:number;
  release:Date;
}


export interface IProductsTable{
	
 	byId: { [key: string]: IProductCommon };
	allIds: string[];
}

export interface IProductsArray extends Array<IProductCommon>{
}

export interface IProductsState{
data:IProductsTable;
loading:boolean;
loaded:boolean;
}