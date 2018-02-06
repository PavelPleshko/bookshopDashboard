import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {DashboardComponent} from './dashboard.component';
import {RouterModule, Routes } from '@angular/router';

const routes:Routes=[
{path:'',component:DashboardComponent},
{path:'orders',loadChildren:'./components/orders/orders.module#OrdersModule'},
{path:'products',loadChildren:'./components/products/products.module#ProductsModule'},
{path:'customers',loadChildren:'./components/customers/customers.module#CustomersModule'},
{path:'reports',loadChildren:'./components/reports/reports.module#ReportsModule'},
{path:'calendar',loadChildren:'./components/calendar/calendar.module#CalendarModule'},
];

@NgModule({
  imports: [
    CommonModule,SharedModule,RouterModule.forChild(routes)
  ],
  declarations: [DashboardComponent],
  exports:[]
})
export class DashboardModule { }
