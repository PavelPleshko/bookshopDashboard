import {Injectable} from '@angular/core';
import {Effect,Actions} from '@ngrx/effects';
import {switchMap,map,catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import * as usersActions from './users.actions';
import {CustomersService} from '../../../../dashboard/components/customers/services/customers.service';
import {tableHelper} from '../../../../shared/helpers/table';

@Injectable()
export class UsersEffects{

	constructor(public actions$:Actions,public customersService:CustomersService){}

@Effect()
loadCustomers$ = this.actions$.ofType(usersActions.LOAD_USERS).pipe(
	switchMap(()=>{
		return this.customersService.getCustomers().pipe(
			map((customers)=>{
				customers = tableHelper(customers);
				return new usersActions.LoadUsersSuccess(customers);
			}),
			catchError((error) => of(new usersActions.LoadUsersFail(error)))
	)}))

}