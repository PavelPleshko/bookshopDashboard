import { IProductsState,IProductsTable } from './products.interface';

export function productsState(): IProductsState {
  return {
    data:{
    byId: {},
    allIds: []
	},
	loading:false,
	loaded:false
  	};
}