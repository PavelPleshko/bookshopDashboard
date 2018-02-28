import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdatesComponent } from './updates.component';
import {RouterModule, Routes } from '@angular/router';
import {SharedModule} from '../../../shared/shared.module';
import { UpdatesListComponent } from './components/updates-list/updates-list.component';


const routes:Routes = [
{path:'',component:UpdatesComponent}
];

@NgModule({
  imports: [
    CommonModule,SharedModule,RouterModule.forChild(routes)
  ],
  declarations: [UpdatesComponent, UpdatesListComponent]
})
export class UpdatesModule { }
