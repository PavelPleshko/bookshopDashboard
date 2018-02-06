import { ActionReducer, Action } from '@ngrx/store';
import * as CustomerGroupsActions from './customers-group.actions';
import { customersGroupState } from './customers-group.initial-state';
import { ICustomerGroupTable,ICustomerGroupState } from './customers-groups.interface';


export function customerGroupsReducer(state:ICustomerGroupState=customersGroupState(),action:CustomerGroupsActions.All):ICustomerGroupState{
	switch (action.type) {
		case CustomerGroupsActions.LOAD_CUSTOMERS_GROUPS:{
			return {
				...state,
				loading:true
			}
		}
		case CustomerGroupsActions.LOAD_CUSTOMERS_GROUPS_SUCCESS:{
			return {
				...state,
				data:action.payload,
				loading:false,
				loaded:true
			}
		}

		case CustomerGroupsActions.LOAD_CUSTOMERS_GROUPS_FAIL:{
			return {
				...state,
				loading:false,
				loaded:false
			}
		}
		case CustomerGroupsActions.ADD_CUSTOMERS_GROUP_SUCCESS:{
			return {
				...state,
				data:{
					...state.data,
					byId:{
						...state.data.byId,
						[action.payload.id]:action.payload
					},
					allIds:[...state.data.allIds,action.payload.id]
				}
			}
		}
		case CustomerGroupsActions.ADD_CUSTOMERS_GROUP_FAIL:{
			return {
				...state
			}
		}			
		default:{
			return state;
		}
	}
}