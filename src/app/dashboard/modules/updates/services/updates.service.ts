import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../../../../environments/environment.prod';
import {IUpdatesTable,IUpdateCommon} from '../../../../shared/store/states/updates/updates.interface';
import {catchError} from 'rxjs/operators';


@Injectable()
export class UpdatesService {
server_url:string = environment.SERVER_URL;
  constructor(public http:HttpClient) { }


getUpdates():Observable<IUpdatesTable>{
	let url = this.server_url + 'updates';
	return this.http.get<IUpdatesTable>(url).pipe(
		catchError((error:any)=>Observable.throw(error.json())
		)
		);
}
}
