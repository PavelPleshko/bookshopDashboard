import { Component,HostBinding,OnInit } from '@angular/core';
import * as usersActions from './shared/store/states/users/users.actions';
import * as productsActons from './shared/store/states/products/products.actions';
import * as ordersActions from './shared/store/states/orders/orders.actions';
import * as updatesActions from './shared/store/states/updates/updates.actions';
import {getPopulatedUpdatesArray} from './shared/store/states/updates/updates.selector';
import {Store} from '@ngrx/store';
import {ThemeService} from './shared/services/theme.service';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
   
})
export class AppComponent implements OnInit{
  @HostBinding('attr.class') currentTheme ='default';
  sidebarCollapsed:boolean = true;
  updates;
 constructor(public store$:Store<any>,public themeService:ThemeService){}

 ngOnInit(){
 	this.themeService.currentTheme$.subscribe((themeName)=>{
 		this.currentTheme=themeName;
 	});
 	this.store$.dispatch(new usersActions.LoadUsers());
 	this.store$.dispatch(new productsActons.LoadProducts());
 	this.store$.dispatch(new ordersActions.LoadOrders());
 	this.store$.dispatch(new updatesActions.LoadUpdates());
 	this.store$.select(getPopulatedUpdatesArray).subscribe(updates=>{
 		this.updates=updates;
 	});
 }

 onThemeChanged(event){
 	if(event){
 		this.themeService.changeTheme('default');
 	}else{
 		this.themeService.changeTheme('light');
 	}
 }

 onToggleSidebar(){
 	this.sidebarCollapsed=!this.sidebarCollapsed;
 }

}
