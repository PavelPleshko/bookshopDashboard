import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {getPopulatedOrdersArray} from '../../../shared/store/states/orders/orders.selector';
import * as ordersActions from '../../../shared/store/states/orders/orders.actions';
import {map} from 'rxjs/operators';
import {stringSortFunction,numSortFunction} from '../../../shared/helpers/library';
import {routeAnimation} from '../../../animations/animations';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
   animations: [routeAnimation],
   host: {'[@routeAnimation]': ''}
})
export class OrdersComponent implements OnInit {
orders;
filters;
theaders;
currentPage=1;
totalItems;
pageSize=10;
get totalPages(){
return Math.ceil(this.totalItems/this.pageSize);
}
  constructor(public store$:Store<any>) { }

  ngOnInit() {
  	this.filters = [{title:'id',type:'string'},{title:'buyer',type:'string'},
  	{title:'products',type:'array'},{title:'amount',type:'number'},
  	{title:'total',type:'number'},{title:'status',type:'string'}]
  	this.theaders = [{title:'Action',sort:false,value:'action'},{title:'ID',sort:true,value:'id'},
  	{title:'Buyer',sort:true,value:'buyer'},{title:'Products',sort:false,value:'products'},
  	{title:'Amount',sort:true,value:'amount'},{title:'Total',sort:true,value:'total'},
  	{title:'Status',sort:true,value:'status'},{title:'Last updated',sort:true,value:'lastUpdated'}];

  	
  	this.store$.select(getPopulatedOrdersArray).pipe(map((orders)=>{
  		
      this.orders = orders;
  		this.totalItems = this.orders.length;
  	})).subscribe();
  }




onSort(options){
		this.orders = [...this.orders].sort((orderOne,orderTwo)=>{
			let one = orderOne[options.field];
			let two = orderTwo[options.field]
			console.log(typeof orderOne[options.field])
			if(typeof two == 'string'){
				return stringSortFunction(one,two,options.isAsc);
			}else{
				return numSortFunction(one,two,options.isAsc);
			}
		});
}


}
