import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {DashboardComponent} from './dashboard.component';
import {RouterModule, Routes } from '@angular/router';
import { DashboardInfoCardComponent } from './components/dashboard-info-card/dashboard-info-card.component';
import { DashboardPrimaryChartComponent } from './components/dashboard-primary-chart/dashboard-primary-chart.component';
import { DashboardMapChartComponent } from './components/dashboard-map-chart/dashboard-map-chart.component';
const routes:Routes=[
{path:'',pathMatch:'full',component:DashboardComponent},
{path:'orders',loadChildren:'./modules/orders/orders.module#OrdersModule'},
{path:'products',loadChildren:'./modules/products/products.module#ProductsModule'},
{path:'customers',loadChildren:'./modules/customers/customers.module#CustomersModule'},
{path:'updates',loadChildren:'./modules/updates/updates.module#UpdatesModule'},
];

@NgModule({
  imports: [
    CommonModule,SharedModule,RouterModule.forChild(routes)
  ],
  declarations: [DashboardComponent, DashboardInfoCardComponent, DashboardPrimaryChartComponent, DashboardMapChartComponent],
  exports:[]
})
export class DashboardModule { }
