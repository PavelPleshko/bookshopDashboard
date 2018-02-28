import {createSelector,createFeatureSelector} from '@ngrx/store';
import {IUsersTable,IUsersState,IUsersArray} from './users.interface';
import {Store} from '@ngrx/store';
import {IStore} from '../../interfaces/store.interface';


export const getAllUsersState = createFeatureSelector<IUsersState>('users');

export const getAllUsers = createSelector(getAllUsersState,(state:IUsersState)=>state.data);

export const getUserArray = createSelector(getAllUsers,(state:IUsersTable)=>{
	const users = state.allIds.map(userId=>{
		let user = state.byId[userId];
		return user;
	})
	return users;
});

export const getUsersLoaded = createSelector(getAllUsersState,(state:IUsersState)=>{
	return state.loaded;
})

export const getUsersLoading = createSelector(getAllUsersState,(state:IUsersState)=>{
	return state.loading;
})

export const getUsersOnline = createSelector(getUserArray,(users:IUsersArray)=>{
	return users.filter(user=>user.isOnline);
})

export const getUsersOffline = createSelector(getUserArray,(users:IUsersArray)=>{
	return users.filter(user=>!user.isOnline);
})

