import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { SidebarComponent } from './components/sidebar/sidebar.component';
import {NavbarComponent } from './components/navbar/navbar.component';
import {RouterModule} from '@angular/router';
import {CustomersService} from '../dashboard/modules/customers/services/customers.service';
import {ProductsService} from '../dashboard/modules/products/services/products.service';
import {OrdersService} from '../dashboard/modules/orders/services/orders.service';
import {UpdatesService} from '../dashboard/modules/updates/services/updates.service';


import {TitleFilterPipe} from './pipes/title-filter.pipe';
import {MultipleFilterPipe} from './pipes/multiple-filter.pipe';
import {OverflowPipe} from './pipes/overflow.pipe';
import {PaginationPipe} from './pipes/pagination.pipe';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { UpdateSingleComponent } from '../dashboard/modules/updates/components/update-single/update-single.component';

export const MODULES = [
CommonModule,NgbModule,ReactiveFormsModule,FormsModule,HttpClientModule,RouterModule];

@NgModule({
  imports: [
   ...MODULES
  ],
  declarations: [UpdateSingleComponent,SidebarComponent,NavbarComponent,TitleFilterPipe,MultipleFilterPipe,OverflowPipe,PaginationPipe],
  providers:[CustomersService,ProductsService,OrdersService,UpdatesService],
  exports:[UpdateSingleComponent,FormsModule,ReactiveFormsModule,NgbModule,
  SidebarComponent,NavbarComponent,PaginationPipe,
  MultipleFilterPipe,TitleFilterPipe,OverflowPipe]
})
export class SharedModule { }
