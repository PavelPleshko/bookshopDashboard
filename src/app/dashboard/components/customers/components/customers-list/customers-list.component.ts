import { Component,Input,ChangeDetectionStrategy,OnChanges,SimpleChanges} from '@angular/core';
import {Store} from '@ngrx/store';
import * as usersActions from '../../../../../shared/store/states/users/users.actions';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CustomersListComponent implements OnChanges{
@Input() customers;
@Input() groups;

constructor(public store$:Store<any>){}

filter:string;
groupList;

ngOnChanges(changes:SimpleChanges){
if(changes.groups){
	this.groupList = this.groups.slice().map((group)=>{
		return {id:group.id,title:group.title};
	})
}
}

onAddOrRemoveUserFromGroup(data){
	let user = this.findItemById(data.userId,this.customers);
	let group = this.findItemById(data.groupId,this.groups);


	let userInTheGroupIdx = this.findIndexById(data.groupId,user.groups);
	console.log(userInTheGroupIdx);
	if(userInTheGroupIdx >= 0){
		user = {
			...user,
			groups:[...user.groups].filter((id)=> id != data.groupId)
		}
		group = {
			...group,
			users:[...group.users.byId].filter((user)=>user.id != data.userId)
		}
		console.log(user,group);

	}else{
		user = {
			...user,
			groups:[...user.groups,data.groupId]
		}
		group = {
			...group,
			users:[...group.users.byId,user]
		}
	}

this.store$.dispatch(new usersActions.UpdateUserGroup({user:user,group:group}));
}

findItemById(item,arr){
	return arr.find((i) => i.id == item);
}

findIndexById(item,arr){
	return arr.findIndex((i) => i == item);
}

}
