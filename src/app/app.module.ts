import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {SharedModule} from './shared/shared.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {reducers,metaReducers} from './shared/store/states/root.reducer';
import {effects} from './shared/store/states/root.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {InMemoryWebApiModule} from 'angular-in-memory-web-api'; 
import {InMemoryDataService}  from './shared/mockDb/db';

const routes:Routes = [
{path:'dashboard',loadChildren:'./dashboard/dashboard.module#DashboardModule'},
{path:'',pathMatch:'full',redirectTo:'dashboard'},
{path:'**',redirectTo:'dashboard'}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,SharedModule,RouterModule.forRoot(routes),
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    NgbModule.forRoot(),StoreModule.forRoot(reducers,{metaReducers}),EffectsModule.forRoot(effects),
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
