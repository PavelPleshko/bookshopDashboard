import {createSelector,createFeatureSelector} from '@ngrx/store';
import {IOrdersTable,IOrdersState,IOrdersArray} from './orders.interface';
import {Store} from '@ngrx/store';
import {IStore} from '../../interfaces/store.interface';
import {getAllUsers} from '../users/users.selector';
import {IUsersTable} from '../users/users.interface';
import {getAllProducts} from '../products/products.selector';
import {IProductsTable} from '../products/products.interface';



export const getAllOrdersState = createFeatureSelector<IOrdersState>('orders');

export const getAllOrders = createSelector(getAllOrdersState,(state:IOrdersState)=>state.data);

export const getOrdersArray = createSelector(getAllOrders,(state:IOrdersTable)=>{
	const orders = state.allIds.map(orderId=>{
		let order = state.byId[orderId];
		return order;
	})
	return orders;
});

export const getOrdersLoaded = createSelector(getAllOrdersState,(state:IOrdersState)=>{
	return state.loaded;
})

export const getOrdersLoading = createSelector(getAllOrdersState,(state:IOrdersState)=>{
	return state.loading;
})


export const getPopulatedOrdersArray = createSelector(getAllOrders,getAllUsers,getAllProducts,
	(orders:IOrdersTable,users:IUsersTable,products:IProductsTable)=>{
		const ordersSummaryArray = orders.allIds.reduce((acc,orderId)=>{
			let order = orders.byId[orderId];
			let buyer = users.byId[order.buyer];
			let total=0;
			let productsArr = order.products.map((productId)=>{
				let product = products.byId[productId];
				total +=product.price;
				return product;
			});

			let newOrder = {
				...order,
				buyer:buyer.name,
				products:productsArr.map(p=>p.title),
				total:total
			};
			acc.push(newOrder);
			return acc;
		},[])
		return ordersSummaryArray;
})

