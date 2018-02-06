import { IUsersState,IUsersTable } from './users.interface';

export function usersState(): IUsersState {
  return {
    data:{
    byId: {},
    allIds: []
	},
	loading:false,
	loaded:false
  	};
}