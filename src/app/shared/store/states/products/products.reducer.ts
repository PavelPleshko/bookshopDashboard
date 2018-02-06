import { ActionReducer} from '@ngrx/store';
import * as productsActions from './products.actions';
import { productsState } from './products.initial-state';
import { IProductsTable,IProductsState } from './products.interface';


export function productsReducer(state:IProductsState=productsState(),action:productsActions.All):IProductsState{

	switch (action.type) {
		case productsActions.LOAD_PRODUCTS:{
			return {
				...state,
				loading:true
			}
		}
		case productsActions.LOAD_PRODUCTS_SUCCESS:{
			return {
				...state,
				loading:false,
				loaded:true,
				data:action.payload
			}
		}
		case productsActions.LOAD_PRODUCTS_FAIL:{
			return {
				...state,
				loading:false,
				loaded:false
			}
		}

		case productsActions.ADD_PRODUCT_SUCCESS:{
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

		case productsActions.EDIT_PRODUCT:{
			return {
				...state,
				loading:true,
				loaded:false
			}
		}

		case productsActions.EDIT_PRODUCT_SUCCESS:{
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

		default:{
			return state;
		}
		
	}
}