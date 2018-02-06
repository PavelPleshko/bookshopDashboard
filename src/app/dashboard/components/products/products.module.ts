import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import {RouterModule, Routes } from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductSingleComponent } from './components/product-single/product-single.component';
import { ProductEditModalComponent } from './components/product-edit-modal/product-edit-modal.component';


const routes:Routes = [
{path:'',component:ProductsComponent}
];


@NgModule({
  imports: [
    CommonModule,SharedModule,RouterModule.forChild(routes)
  ],
  entryComponents:[ProductEditModalComponent],
  declarations: [ProductsComponent, ProductListComponent, ProductSingleComponent, ProductEditModalComponent]
})
export class ProductsModule { }
