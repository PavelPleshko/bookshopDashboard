import {UsersEffects} from './users/users.effects';
import {CustomersGroupEffects} from './customers-groups/customers-group.effects';
import {ProductsEffects} from './products/products.effects';
import {OrdersEffects} from './orders/orders.effects';



export const effects:any[] = [UsersEffects,CustomersGroupEffects,ProductsEffects,OrdersEffects];