import {Injectable} from '@angular/core';
import {Effect,Actions} from '@ngrx/effects';
import {switchMap,map,catchError} from 'rxjs/operators';
import {of} from 'rxjs/observable/of';
import * as updatesActions from './updates.actions';
import {UpdatesService} from '../../../../dashboard/modules/updates/services/updates.service';
import {tableHelper} from '../../../../shared/helpers/table';

@Injectable()
export class UpdatesEffects{

	constructor(public actions$:Actions,public updatesService:UpdatesService){}

@Effect()
loadUpdates$ = this.actions$.ofType(updatesActions.LOAD_UPDATES).pipe(
	switchMap(()=>{
		return this.updatesService.getUpdates().pipe(
			map((updates)=>{
				updates = tableHelper(updates);
				return new updatesActions.LoadUpdatesSuccess(updates);
			}),
			catchError((error) => of(new updatesActions.LoadUpdatesFail(error)))
	)}));
}