import { BrowserModule } from '@angular/platform-browser';
import {RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { ChartModule } from 'angular2-highcharts';
import {HighchartsStatic} from 'angular2-highcharts/dist/HighchartsService';
import {ThemeService} from './shared/services/theme.service';

declare var require: any;
export function highchartsFactory() {
    const hc = require('highcharts/highmaps');
    const dd = require('highcharts/modules/exporting');
    dd(hc);
    return hc;
}


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
    BrowserModule,SharedModule,RouterModule.forRoot(routes),BrowserAnimationsModule,
    ChartModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService),
    NgbModule.forRoot(),StoreModule.forRoot(reducers,{metaReducers}),EffectsModule.forRoot(effects),
   
  ],
  providers:[ThemeService,
	{
		provide: HighchartsStatic,
		useFactory: highchartsFactory
	}
],
  bootstrap: [AppComponent]
})
export class AppModule { }
