import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../../../environments/environment.prod';
import {IUsersTable} from '../../../../shared/store/states/users/users.interface';
import {IProductsTable,IProductCommon} from '../../../../shared/store/states/products/products.interface';
import {catchError} from 'rxjs/operators';


@Injectable()
export class ProductsService {
server_url:string = environment.SERVER_URL;
  constructor(public http:HttpClient) { }


getProducts():Observable<IProductsTable>{
	let url = this.server_url + 'products';
	return this.http.get<IProductsTable>(url).pipe(
		catchError((error:any)=>Observable.throw(error.json())
		)
		);
}

editProduct(product):Observable<IProductCommon>{
		console.log(product);
	let url = `${this.server_url}products/${product.id}`;
	return this.http.put(url,product).pipe(
		catchError((error:any)=>{
				console.log(error);
			return Observable.throw(error.json())}));
		}


}
