import {usersReducer} from './users/users.reducer';
import {customerGroupsReducer} from './customers-groups/customers-group.reducer';
import {productsReducer} from './products/products.reducer';
import {ordersReducer} from './orders/orders.reducer';

import {ActionReducerMap,MetaReducer} from '@ngrx/store';
import {IStore} from '../interfaces/store.interface';
import {enableBatchReducer} from 'ngrx-batch-action-reducer';
import {storeFreeze} from 'ngrx-store-freeze';
import {environment} from '../../../../environments/environment';

export const reducers:ActionReducerMap<IStore> = {
	users:usersReducer,
	customer_groups:customerGroupsReducer,
	products:productsReducer,
	orders:ordersReducer
}


export const metaReducers: MetaReducer<IStore>[] = !environment.production ?
[storeFreeze, enableBatchReducer] :
[enableBatchReducer];