import {createSelector,createFeatureSelector} from '@ngrx/store';
import {IUpdatesTable,IUpdatesArray,IUpdatesState} from './updates.interface';
import {Store} from '@ngrx/store';
import {IStore} from '../../interfaces/store.interface';
import {getAllUsers} from '../users/users.selector';
import {IUsersTable} from '../users/users.interface';
import {getAllOrders} from '../orders/orders.selector';
import {IOrdersTable} from '../orders/orders.interface';

export const getAllUpdatesState = createFeatureSelector<IUpdatesState>('updates');

export const getAllUpdates = createSelector(getAllUpdatesState,(state:IUpdatesState)=>state.data);

export const getUpdatesArray = createSelector(getAllUpdates,(state:IUpdatesTable)=>{
	const updates = state.allIds.map(updateId=>{
		let update = state.byId[updateId];
		return update;
	})
	return updates;
});

export const getUpdatesLoaded = createSelector(getAllUpdatesState,(state:IUpdatesState)=>{
	return state.loaded;
})

export const getUpdatesLoading = createSelector(getAllUpdatesState,(state:IUpdatesState)=>{
	return state.loading;
})


export const getPopulatedUpdatesArray = createSelector(getAllOrders,getAllUsers,getAllUpdates,
	(orders:IOrdersTable,users:IUsersTable,updates:IUpdatesTable)=>{
	const updatesArray = updates.allIds.reduce((acc,updateId)=>{
			let update = updates.byId[updateId];
			let user = users.byId[update.user];
			let target;
			if(update.target){
				target = orders.byId[update.target];
			}

			let newUpdate = {
				...update,
				user:user,
				target:target,
			};
			acc.push(newUpdate);
			return acc;
		},[])
		return updatesArray;
})

