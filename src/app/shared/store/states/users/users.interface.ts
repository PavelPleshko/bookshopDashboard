


export interface IUserCommon {
  id: string;
  name: string;
  groups:Array<string>;
  username: string;
  thumbnail: string;
  country:string;
  isOnline: boolean;
}


export interface IUsersTable{
	
 	byId: { [key: string]: IUserCommon };
	allIds: string[];
}

export interface IUsersArray extends Array<IUserCommon>{
}

export interface IUsersState{
data:IUsersTable;
loading:boolean;
loaded:boolean;
}