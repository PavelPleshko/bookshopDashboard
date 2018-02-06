import {createSelector,createFeatureSelector,MemoizedSelector} from '@ngrx/store';
import {ICustomerGroupTable,ICustomerGroup,ICustomerGroupState,ICustomerGroupArray} from './customers-groups.interface';
import {Store} from '@ngrx/store';
import {IStore} from '../../interfaces/store.interface';
import {getAllUsers} from '../users/users.selector';
import {IUsersTable,IUserCommon} from '../users/users.interface';

export const getAllCustomersGroupsState = createFeatureSelector<ICustomerGroupState>('customer_groups');
export const getAllGroups = createSelector(getAllCustomersGroupsState,(state:ICustomerGroupState)=>state.data);



export const getCustomersGroupsWithUsers = createSelector(getAllUsers,getAllGroups,(users,groups:ICustomerGroupTable)=>{
	

const groupsWithUsers = groups.allIds.map((id)=>{
	const usersGroups = users.allIds.map((userId)=>{
		return users.byId[userId];
	}).filter((user)=>user.groups.includes(id));

var len = usersGroups.length;

	return {
		...groups.byId[id],
		users:{
			byId:usersGroups,
			length:len
		}
	}
	})	
return {
	...groups,
	byId:groupsWithUsers	
}
})

export const getCustomersGroupsArray = createSelector(getCustomersGroupsWithUsers,(state:any)=>{
	const groups = state.allIds.map(groupId=>{
		let group = state.byId[groupId];
		return group;
	})
	return groups;
});


export const getGroupsLoaded = createSelector(getAllCustomersGroupsState,(state:ICustomerGroupState)=>{
	return state.loaded;
});

export const getGroupsLoading = createSelector(getAllCustomersGroupsState,(state:ICustomerGroupState)=>{
	return state.loading;
});


