import { ActionReducer} from '@ngrx/store';
import * as UsersActions from './users.actions';
import { usersState } from './users.initial-state';
import { IUsersTable,IUsersState } from './users.interface';


export function usersReducer(state:IUsersState=usersState(),action:UsersActions.All):IUsersState{

	switch (action.type) {
		case UsersActions.LOAD_USERS:{
			return {
				...state,
				loading:true
			}
		}
		case UsersActions.LOAD_USERS_SUCCESS:{
			return {
				...state,
				loading:false,
				loaded:true,
				data:action.payload
			}
		}
		case UsersActions.LOAD_USERS_FAIL:{
			return {
				...state,
				loading:false,
				loaded:false
			}
		}

		case UsersActions.UPDATE_USER_GROUP:{
			return {
				...state,
				data:{
					...state.data,
					byId:{
						...state.data.byId,
						[action.payload.user.id]:{
							...action.payload.user
						}
					}
				}
			}
		}

		default:{
			return state;
		}
		
	}
}