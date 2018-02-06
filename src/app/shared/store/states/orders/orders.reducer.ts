import { ActionReducer} from '@ngrx/store';
import * as ordersActions from './orders.actions';
import { ordersState } from './orders.initial-state';
import { IOrdersTable,IOrdersState } from './orders.interface';


export function ordersReducer(state:IOrdersState=ordersState(),action:ordersActions.All):IOrdersState{

	switch (action.type) {
		case ordersActions.LOAD_ORDERS:{
			return {
				...state,
				loading:true
			}
		}
		case ordersActions.LOAD_ORDERS_SUCCESS:{
			return {
				...state,
				loading:false,
				loaded:true,
				data:action.payload
			}
		}
		case ordersActions.LOAD_ORDERS_FAIL:{
			return {
				...state,
				loading:false,
				loaded:false
			}
		}

		case ordersActions.ADD_ORDER_SUCCESS:{
			return {
				...state,
				data:{
					byId:{
						...state.data.byId,
						[action.payload.id]:action.payload
					},
					allIds:[...state.data.allIds,action.payload.id]
				}
				
			}
		}

		case ordersActions.EDIT_ORDER:
		case ordersActions.CHANGE_ORDER_STATUS:{
			return {
				...state,
				loading:true,
				loaded:false
			}
		}

		case ordersActions.EDIT_ORDER_SUCCESS:
		case ordersActions.CHANGE_ORDER_STATUS_SUCCESS:{
			return {
				...state,
				data:{
					byId:{
						...state.data.byId,
						[action.payload.id]:action.payload
					},
					allIds:[...state.data.allIds]
				},
				loading:false,
				loaded:true
			}
		}

			case ordersActions.REMOVE_ORDER_SUCCESS:{
			const ordersTbl = {
				...state,
				data:{
					byId:{
						...state.data.byId,
					},
					allIds:[...state.data.allIds].filter((id)=>id != action.payload)
				},
				loading:false,
				loaded:true
			}

			delete ordersTbl.data.byId[action.payload];
			return ordersTbl;
		}
	

		default:{
			return state;
		}
		
	}
}