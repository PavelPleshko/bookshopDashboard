import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomersComponent } from './customers.component';
import {RouterModule, Routes } from '@angular/router';
import { CustomersListComponent } from './components/customers-list/customers-list.component';
import { CustomerSingleComponent } from './components/customer-single/customer-single.component';
import { CustomersGroupListComponent } from './components/customers-group-list/customers-group-list.component';
import { AddGroupFormComponent } from './components/add-group-form/add-group-form.component';
import {SharedModule} from '../../../shared/shared.module';
import { DropdownComponent } from './components/dropdown/dropdown.component';

const routes:Routes = [
{path:'',component:CustomersComponent}
];


@NgModule({
  imports: [
    CommonModule,RouterModule.forChild(routes),SharedModule
  ],
  declarations: [CustomersComponent, CustomersListComponent, CustomerSingleComponent, CustomersGroupListComponent, AddGroupFormComponent, DropdownComponent]
})
export class CustomersModule { }
