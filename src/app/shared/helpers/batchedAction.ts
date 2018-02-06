import { Action } from '@ngrx/store';
import { BatchAction } from 'ngrx-batch-action-reducer';

@BatchAction()
export class MultiAction implements Action {
    readonly type = 'MULTI';
    constructor(public payload) {
    	
    }
}