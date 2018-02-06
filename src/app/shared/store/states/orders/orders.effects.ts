import {Injectable} from '@angular/core';
import {Effect,Actions} from '@ngrx/effects';
import {switchMap,map,catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import * as ordersActions from './orders.actions';
import {OrdersService} from '../../../../dashboard/components/orders/services/orders.service';
import {tableHelper} from '../../../../shared/helpers/table';

@Injectable()
export class OrdersEffects{

	constructor(public actions$:Actions,public ordersService:OrdersService){}

@Effect()
loadOrders$ = this.actions$.ofType(ordersActions.LOAD_ORDERS).pipe(
	switchMap(()=>{
		return this.ordersService.getOrders().pipe(
			map((orders)=>{
				orders = tableHelper(orders);
				return new ordersActions.LoadOrdersSuccess(orders);
			}),
			catchError((error) => of(new ordersActions.LoadOrdersFail(error)))
	)}));


@Effect()
editOrder$ = this.actions$.ofType(ordersActions.EDIT_ORDER).pipe(
	switchMap((action)=>{
			let order = action['payload'];
		return this.ordersService.editOrder(order).pipe(
			map(()=>{
				return new ordersActions.EditOrderSuccess(order);
			}),
			catchError((error)=> {
				return of(new ordersActions.EditOrderFail(error))}))
	})
	)


@Effect()
addOrder$ = this.actions$.ofType(ordersActions.ADD_ORDER).pipe(
	switchMap((action)=>{
			let order = action['payload'];
		return this.ordersService.addOrder(order).pipe(
			map(()=>{
				return new ordersActions.AddOrderSuccess(order);
			}),
			catchError((error)=> {
				return of(new ordersActions.AddOrderFail(error))}))
	})
	)

@Effect()
deleteOrder$ = this.actions$.ofType(ordersActions.REMOVE_ORDER).pipe(
	switchMap((action)=>{
			let orderId = action['payload'];
		return this.ordersService.deleteOrder(orderId).pipe(
			map(()=>{
				return new ordersActions.RemoveOrderSuccess(orderId);
			}),
			catchError((error)=> {
				return of(new ordersActions.RemoveOrderFail(error))}))
	})
	)
}