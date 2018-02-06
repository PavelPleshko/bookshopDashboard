import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { SidebarComponent } from './components/sidebar/sidebar.component';
import {NavbarComponent } from './components/navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {CustomersService} from '../dashboard/components/customers/services/customers.service';
import {ProductsService} from '../dashboard/components/products/services/products.service';
import {OrdersService} from '../dashboard/components/orders/services/orders.service';

import {TitleFilterPipe} from './pipes/title-filter.pipe';
import {MultipleFilterPipe} from './pipes/multiple-filter.pipe';
import {PaginationPipe} from './pipes/pagination.pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

export const MODULES = [
CommonModule,NgbModule,ReactiveFormsModule,FormsModule,HttpClientModule,RouterModule];

@NgModule({
  imports: [
   ...MODULES
  ],
  declarations: [SidebarComponent,NavbarComponent,TitleFilterPipe,MultipleFilterPipe,PaginationPipe],
  providers:[CustomersService,ProductsService,OrdersService],
  exports:[FormsModule,ReactiveFormsModule,NgbModule,
  SidebarComponent,NavbarComponent,PaginationPipe,
  MultipleFilterPipe,TitleFilterPipe]
})
export class SharedModule { }
