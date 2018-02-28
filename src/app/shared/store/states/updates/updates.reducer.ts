import { ActionReducer} from '@ngrx/store';
import * as updatesActions from './updates.actions';
import { updatesState } from './updates.initial-state';
import { IUpdatesTable,IUpdatesState } from './updates.interface';


export function updatesReducer(state:IUpdatesState=updatesState(),action:updatesActions.All):IUpdatesState{

	switch (action.type) {
		case updatesActions.LOAD_UPDATES:{
			return {
				...state,
				loading:true
			}
		}
		case updatesActions.LOAD_UPDATES_SUCCESS:{
			return {
				...state,
				loading:false,
				loaded:true,
				data:action.payload
			}
		}
		case updatesActions.LOAD_UPDATES_FAIL:{
			return {
				...state,
				loading:false,
				loaded:false
			}
		}

		
		default:{
			return state;
		}
		
	}
}