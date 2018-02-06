import { Component,HostBinding,OnInit } from '@angular/core';
import * as usersActions from './shared/store/states/users/users.actions';
import * as productsActons from './shared/store/states/products/products.actions';

import {Store} from '@ngrx/store';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  @HostBinding('attr.class') default = 'default';
 constructor(public store$:Store<any>){}
 ngOnInit(){
 	this.store$.dispatch(new usersActions.LoadUsers());
 	this.store$.dispatch(new productsActons.LoadProducts());
 }
	
}
