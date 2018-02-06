import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders.component';
import { OrdersListComponent } from './components/orders-list/orders-list.component';
import { OrderSingleComponent } from './components/order-single/order-single.component';
import {RouterModule, Routes } from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';


const routes:Routes = [
{path:'',component:OrdersComponent}
];

@NgModule({
  imports: [
    CommonModule,SharedModule,RouterModule.forChild(routes)
  ],
  declarations: [OrdersComponent, OrdersListComponent, OrderSingleComponent]
})
export class OrdersModule { }
