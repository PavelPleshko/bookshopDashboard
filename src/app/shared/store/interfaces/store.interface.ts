import {IUsersState} from '../states/users/users.interface';
import {ICustomerGroupState} from '../states/customers-groups/customers-groups.interface';
import {IProductsState} from '../states/products/products.interface';
import {IOrdersState} from '../states/orders/orders.interface';
import {IUpdatesState} from '../states/updates/updates.interface';

export interface IStore{
	users:IUsersState;
	customer_groups:ICustomerGroupState;
	products:IProductsState;
	orders:IOrdersState;
	updates:IUpdatesState;
}