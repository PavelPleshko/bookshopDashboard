import { Component, OnInit,OnDestroy} from '@angular/core';
import * as usersActions from '../shared/store/states/users/users.actions';
import * as productsActons from '../shared/store/states/products/products.actions';
import {Store} from '@ngrx/store';
import {getUsersWithOrders,getPopulatedOrdersArray} from '../shared/store/states/orders/orders.selector';
import {IOrderPopulated} from '../shared/store/states/orders/orders.interface';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';
import {forkJoin} from "rxjs/observable/forkJoin";
import 'rxjs/add/operator/reduce';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/observable/from';
import {Observable} from 'rxjs/Observable';
import {mergeMap,concatMap} from 'rxjs/operators';
import {ThemeService} from '../shared/services/theme.service';
import {routeAnimation} from '../animations/animations';

export const infoCards:any[] = [
{title:'Active users',type:'active_users',data:{}},
{title:'Current purchases($)',type:'current_purchases',data:{}},
{title:'Orders finalized',type:'orders_finalized',data:{}},
{title:'Orders cancelled',type:'orders_cancelled',data:{}}
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
    animations: [routeAnimation],
   host: {'[@routeAnimation]': ''}
})
export class DashboardComponent implements OnInit,OnDestroy {
infoCards;
subs=[];
currentDate;
currentTheme;
timeThreshold;
revenueChartOptions:any={};
usersMapChartOptions:any={};
ordersFilter$:Subject<any> = new Subject();

  constructor(public store$:Store<any>,
  	public themeService:ThemeService) { }

  ngOnInit(){
  		let themeSub = this.themeService.currentTheme$.subscribe((theme)=>{
  		console.log(theme);
  		this.currentTheme = this.themeService.getTheme(theme);
  	});
  	this.infoCards=infoCards;

  	let filter = this.ordersFilter$.map((data)=>{	
  			let truthy = data.payload.filter((order)=>order[data.field] == data.criteria);
  			let falsy = data.payload.filter((order)=>order[data.field] != data.criteria);
  			return {payload:[truthy,falsy],type:data.type};
  	}).subscribe((data)=>{
  		this.updateInfoCards(data.type,data.payload);
  	})
  	  	let mainSub = forkJoin([this.getOrdersReports(),
  	  	this.getActiveUsersReport()])
  	  	.map(data=>{
  	  		return {
  	  			purchases:data[0],
  	  			users:data[1]
  	  		}
  	  	})
  	  	.subscribe(data=>{
  	  		 this.updateInfoCards('active_users',data.users);
  	  		 this.updateInfoCards('current_purchases',data.purchases);
  	  	});
  	  	this.subs.push(filter,mainSub,themeSub);
  	  	
  }


updateInfoCards(type,payload){
let cardIdx = this.getItemIdxByType(this.infoCards,type);
	if(cardIdx>=0){
		let card = this.infoCards[cardIdx];
		let slices = this.populateSlices(type,payload);

		card.data['slice_1'] = slices[0];
		card.data['slice_2'] = slices[1];
		this.infoCards.splice(cardIdx,1,card);
		this.infoCards = [...this.infoCards];
	}
}

populateSlices(type,payload){
	switch (type) {
		case "active_users":
			return [{
				title:'Active',
				data:payload[0].length
			},{
				title:'Inactive',
				data:payload[1].length
			}]
		case "current_purchases":
		return [
		{title:'This month',data:payload[0]},
		{title:'Last month',data:payload[1]}
		];
		case 'orders_finalized':
		return [
		{title:'Finalized',data:payload[0].length},
		{title:'Others',data:payload[1].length}
		];
		case 'orders_cancelled':
		return [
		{title:'Cancelled',data:payload[0].length},
		{title:'Others',data:payload[1].length}
		]
	}
}

getItemIdxByType(infoCards,type){
return infoCards.findIndex(card=>card.type == type);
}

getOrdersReports(){
	return this.store$.select(getPopulatedOrdersArray).map(orders=>{
		this.populateDataForCharts(orders);
		return orders.filter((order)=>{
  		let currentMonth = new Date().getMonth();
  		let lastMonth;
  		if(currentMonth - 1 < 0){
  			lastMonth = 11;
  		}else{
  			lastMonth = currentMonth-1;
  		}
  		return order.status=='finalized' && (new Date(order.lastUpdated).getMonth() == currentMonth || new Date(order.lastUpdated).getMonth() == lastMonth);
  	}).reduce((acc,order)=>{
  		let isOrderOfThisMonth = (new Date().getMonth() == new Date(order.lastUpdated).getMonth());
  		if(isOrderOfThisMonth){
  			acc[0] +=order.total;
  		}else{
  			acc[1] += order.total;
  		}
  		return acc;
  	},[0,0])}).take(1);
}

getActiveUsersReport(){
		this.timeThreshold = this.convertInMs(30,'days');

    return this.store$.select(getUsersWithOrders).map(arr=>{
   	this.usersMapChartOptions.data = arr;
   	return arr.reduce((acc:Array<object[]>,userWithOrder)=>{
  	 if(!userWithOrder) return acc;
  		let passes = userWithOrder['lastOrder'] && ((Date.now() - this.timeThreshold) <= new Date(userWithOrder['lastOrder']).getTime());
  		if(passes){
  			acc[0].push(userWithOrder);
  		}else if(!passes){
  			acc[1].push(userWithOrder);
  		}
  		return acc;
  	},[[],[]])}).take(1);
}

convertInMs(num,type){
switch (type) {
	case "days":
		return num*24*60*60*1000;
	case "months":
		return num*30*24*60*60*1000;
	default:
		return num*24*60*60*1000;
}
}

populateDataForCharts(orders){
	this.revenueChartOptions = {
			data:orders,
			extract:{
				field1:{name:'lastUpdated',type:'date'},
				field2:{name:'total',type:'number'}
			}
		};
		this.ordersFilter$.next({payload:orders,type:'orders_finalized',field:'status',criteria:'finalized'});
		this.ordersFilter$.next({payload:orders,type:'orders_cancelled',field:'status',criteria:'cancelled'});
}

ngOnDestroy(){
	this.subs.forEach((sub)=>sub.unsubscribe());
}
}
