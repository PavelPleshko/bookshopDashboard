import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../../../environments/environment.prod';
import {IOrdersTable,IOrderCommon} from '../../../../shared/store/states/orders/orders.interface';
import {catchError} from 'rxjs/operators';


@Injectable()
export class OrdersService {
server_url:string = environment.SERVER_URL;
  constructor(public http:HttpClient) { }


getOrders():Observable<IOrdersTable>{
	let url = this.server_url + 'orders';
	return this.http.get<IOrdersTable>(url).pipe(
		catchError((error:any)=>Observable.throw(error.json())
		)
		);
}

editOrder(order):Observable<IOrderCommon>{
	let url = `${this.server_url}orders/${order.id}`;
	return this.http.put(url,order).pipe(
		catchError((error:any)=>{
			return Observable.throw(error.json())}));
		}

addOrder(order):Observable<IOrderCommon>{
	let url = `${this.server_url}orders`;
	return this.http.post(url,order).pipe(
		catchError((error:any)=>{
			return Observable.throw(error.json())}));
		}

deleteOrder(orderId):Observable<IOrderCommon>{
	let url = `${this.server_url}orders/${orderId}`;
	return this.http.delete(url).pipe(
		catchError((error:any)=>{
			return Observable.throw(error.json())}));
		}



}
