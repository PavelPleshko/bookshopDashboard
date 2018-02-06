import { Component, OnInit } from '@angular/core';
import {Store} from '@ngrx/store';
import {getPopulatedOrdersArray} from '../../../shared/store/states/orders/orders.selector';
import * as ordersActions from '../../../shared/store/states/orders/orders.actions';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
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
  	{title:'products',type:'array'},{title:'amount',type:'string'},
  	{title:'total',type:'number'},{title:'status',type:'string'}]
  	this.theaders = [{title:'Action',sort:false,value:'action'},{title:'ID',sort:true,value:'id'},
  	{title:'Buyer',sort:true,value:'buyer'},{title:'Products',sort:false,value:'products'},
  	{title:'Amount',sort:true,value:'amount'},{title:'Total',sort:true,value:'total'},
  	{title:'Status',sort:true,value:'status'},{title:'Created',sort:true,value:'createdAt'}];

  	this.store$.dispatch(new ordersActions.LoadOrders());
  	this.store$.select(getPopulatedOrdersArray).pipe(map((orders)=>{
  		this.orders = orders;
  		this.totalItems = this.orders.length;
  	})).subscribe();
  }

onTotalItemsChange(num){
	if(num != this.totalItems){
		this.totalItems = num;
	console.log(this.totalItems);
	}
	
}


onSort(options){
		this.orders = [...this.orders].sort((orderOne,orderTwo)=>{
			let one = orderOne[options.field];
			let two = orderTwo[options.field]
			console.log(typeof orderOne[options.field])
			if(typeof two == 'string'){
				return this.stringSortFunction(one,two,options.isAsc);
			}else{
				return this.numSortFunction(one,two,options.isAsc);
			}
		});
}

stringSortFunction(a,b,isAsc){
	if(isAsc){
		return a > b ? -1 : 1;
	}else{
		return a < b ? -1 : 1;
	}
}

numSortFunction(a,b,isAsc){
	return isAsc ? a + b : a - b;
}


}
