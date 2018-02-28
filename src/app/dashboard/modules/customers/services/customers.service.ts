import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../../../environments/environment.prod';
import {IUsersTable} from '../../../../shared/store/states/users/users.interface';
import {ICustomerGroupTable,ICustomerGroup} from '../../../../shared/store/states/customers-groups/customers-groups.interface';
import {catchError} from 'rxjs/operators';

@Injectable()
export class CustomersService {
server_url:string = environment.SERVER_URL;
  constructor(public http:HttpClient) { }


getCustomers():Observable<IUsersTable>{

	let url = this.server_url + 'customers';
	return this.http.get<IUsersTable>(url).pipe(
		catchError((error:any)=>Observable.throw(error.json())
		)
		);


}


getCustomersGroups():Observable<ICustomerGroupTable>{
	let url = this.server_url + 'customer_groups';
	return this.http.get<ICustomerGroupTable>(url).pipe(
		catchError((error:any)=>Observable.throw(error.json())));
}

addCustomerGroup(groupToAdd):Observable<ICustomerGroupTable>{
let id = groupToAdd.id;
let url = this.server_url+'customer_groups/' + id;
return this.http.post(url,groupToAdd).pipe(
		catchError((error:any)=>Observable.throw(error.json())));
}


}
