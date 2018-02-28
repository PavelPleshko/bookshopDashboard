import { Component, OnInit } from '@angular/core';
import * as updatesActons from '../../../shared/store/states/updates/updates.actions';
import {Store} from '@ngrx/store';
import {getPopulatedUpdatesArray} from '../../../shared/store/states/updates/updates.selector';
import {routeAnimation} from '../../../animations/animations';

@Component({
  selector: 'app-updates',
  templateUrl: './updates.component.html',
  styleUrls: ['./updates.component.scss'],
  animations: [routeAnimation],
   host: {'[@routeAnimation]': ''}
})
export class UpdatesComponent implements OnInit {
updates;
  constructor(public store$:Store<any>) { }

  ngOnInit() {
  	this.store$.select(getPopulatedUpdatesArray).subscribe((updates)=>{
  		this.updates = updates;
  	})
  }

}
