import { Component, OnInit,OnDestroy } from '@angular/core';
import {Store} from '@ngrx/store';
import * as productsActons from '../../../shared/store/states/products/products.actions';
import {getProductsArray} from '../../../shared/store/states/products/products.selector';
import {map} from 'rxjs/operators';
import {routeAnimation} from '../../../animations/animations';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
   animations: [routeAnimation],
   host: {'[@routeAnimation]': ''}
})
export class ProductsComponent implements OnInit,OnDestroy {
products;
productsStorage;
subscriptions=[];
currentPage=1;
totalItems;
pageSize=10;
get totalPages(){
return Math.ceil(this.totalItems/this.pageSize);
}
  constructor(public store$:Store<any>) { }

  ngOnInit() {
  	let products = this.store$.select(getProductsArray).pipe(map((products)=>{	
  		this.productsStorage = products;
  		this.totalItems=this.productsStorage.length;
  		this.updateEntries();
  	})).subscribe();
  	this.subscriptions.push(products);

  }

updateEntries(){
	const start = (this.currentPage-1)*this.pageSize;
	const end = (this.currentPage-1)*this.pageSize+this.pageSize;	
	this.products = this.productsStorage.slice(start,end);	
}

ngOnDestroy(){
this.subscriptions.forEach((sub)=>sub.unsubscribe());
}
}
