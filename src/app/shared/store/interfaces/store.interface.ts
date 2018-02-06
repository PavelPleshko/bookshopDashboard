import {IUsersState} from '../states/users/users.interface';
import {ICustomerGroupState} from '../states/customers-groups/customers-groups.interface';
import {IProductsState} from '../states/products/products.interface';
import {IOrdersState} from '../states/orders/orders.interface';

export interface IStore{
	//ui:any;
	users:IUsersState;
	customer_groups:ICustomerGroupState;
	products:IProductsState;
	orders:IOrdersState;
	// updates:any;
}