import { Component, OnInit,Input } from '@angular/core';
import {Store} from '@ngrx/store';
import * as customerGroupsActions from '../../../../../shared/store/states/customers-groups/customers-group.actions';
@Component({
  selector: 'app-customers-group-list',
  templateUrl: './customers-group-list.component.html',
  styleUrls: ['./customers-group-list.component.scss']
})
export class CustomersGroupListComponent implements OnInit {
@Input() groups;
colors;
formVisible:boolean = false;

  constructor(public store$:Store<any>) { }

  ngOnInit() {
  	this.colors = ['standard','advanced','premium','golden','warning','inactive'];
  }

toggleForm(){
	this.formVisible = true;
}

onFormSubmitted(data){
if(data){
data.id = this.groups.length.toString();
data.createAt = new Date();
this.store$.dispatch(new customerGroupsActions.AddCustomerGroup(data));
}
this.formVisible=false;
}
}
