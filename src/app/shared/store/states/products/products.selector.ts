import {createSelector,createFeatureSelector} from '@ngrx/store';
import {IProductsTable,IProductsState,IProductsArray} from './products.interface';
import {Store} from '@ngrx/store';
import {IStore} from '../../interfaces/store.interface';

export const getAllProductsState = createFeatureSelector<IProductsState>('products');

export const getAllProducts = createSelector(getAllProductsState,(state:IProductsState)=>state.data);

export const getProductsArray = createSelector(getAllProducts,(state:IProductsTable)=>{
	const products = state.allIds.map(productId=>{
		let product = state.byId[productId];
		return product;
	})
	return products;
});

export const getProductsLoaded = createSelector(getAllProductsState,(state:IProductsState)=>{
	return state.loaded;
})

export const getProductsLoading = createSelector(getAllProductsState,(state:IProductsState)=>{
	return state.loading;
})

