import {Injectable} from '@angular/core';
import {Effect,Actions} from '@ngrx/effects';
import {switchMap,map,catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import * as productsActions from './products.actions';
import {ProductsService} from '../../../../dashboard/components/products/services/products.service';
import {tableHelper} from '../../../../shared/helpers/table';

@Injectable()
export class ProductsEffects{

	constructor(public actions$:Actions,public productsService:ProductsService){}

@Effect()
loadProducts$ = this.actions$.ofType(productsActions.LOAD_PRODUCTS).pipe(
	switchMap(()=>{
		return this.productsService.getProducts().pipe(
			map((products)=>{
				products = tableHelper(products);
				return new productsActions.LoadProductsSuccess(products);
			}),
			catchError((error) => of(new productsActions.LoadProductsFail(error)))
	)}));


@Effect()
editProduct$ = this.actions$.ofType(productsActions.EDIT_PRODUCT).pipe(
	switchMap((action)=>{
			let product = action['payload'];
		return this.productsService.editProduct(product).pipe(
			map(()=>{
					console.log(product);
				return new productsActions.EditProductSuccess(product);
			}),
			catchError((error)=> {
				return of(new productsActions.EditProductFail(error))}))
	})
	)
}