import {Injectable} from '@angular/core';
import {Effect,Actions} from '@ngrx/effects';
import {switchMap,map,catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import * as customersGroupActions from './customers-group.actions';
import {CustomersService} from '../../../../dashboard/modules/customers/services/customers.service';
import {tableHelper} from '../../../../shared/helpers/table';

@Injectable()
export class CustomersGroupEffects{

	constructor(public actions$:Actions,public customersService:CustomersService){}



@Effect()
loadCustomersGroup$ = this.actions$.ofType(customersGroupActions.LOAD_CUSTOMERS_GROUPS).pipe(
	switchMap(()=>{
		return this.customersService.getCustomersGroups().pipe(
			map((groups)=>{
				
				groups = tableHelper(groups);
				return new customersGroupActions.LoadCustomerGroupsSuccess(groups);
			}),
			catchError((error:any)=> of(new customersGroupActions.LoadCustomerGroupsFail(error))
			)
	)})
	)


@Effect()
addCustomersGroup$ = this.actions$.ofType(customersGroupActions.ADD_CUSTOMERS_GROUP).pipe(
switchMap((groupToAdd)=>{
	return this.customersService.addCustomerGroup(groupToAdd).pipe(
		map((group:any)=>{
			group = group['payload'];
			return new customersGroupActions.AddCustomerGroupSuccess(group);
		})
)}
	))
}