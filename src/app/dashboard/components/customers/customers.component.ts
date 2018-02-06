import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {MultiAction} from '../../../shared/helpers/batchedAction';
import {IStore} from '../../../shared/store/interfaces/store.interface';
import {combineLatest} from 'rxjs/operators';

import {getUserArray} from '../../../shared/store/states/users/users.selector';
import {IUsersArray} from '../../../shared/store/states/users/users.interface';
import {getCustomersGroupsArray} from '../../../shared/store/states/customers-groups/customers-groups.selector';
import {ICustomerGroupArray} from '../../../shared/store/states/customers-groups/customers-groups.interface';

import * as usersActions from '../../../shared/store/states/users/users.actions';
import * as customerGroupsActions from '../../../shared/store/states/customers-groups/customers-group.actions';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.scss']
})

export class CustomersComponent implements OnInit {
customers:IUsersArray;
groups:ICustomerGroupArray;


  constructor(public store$:Store<IStore>) { }

  ngOnInit(){ 		
  	this.store$.dispatch(new customerGroupsActions.LoadCustomerGroups());
  
  	this.store$.select(getUserArray).pipe(
  		combineLatest(this.store$.select(getCustomersGroupsArray),(customers:IUsersArray,groups:ICustomerGroupArray)=>{
  		this.customers = customers;
  		this.groups = groups;
  	})).subscribe();
  }


  

}
