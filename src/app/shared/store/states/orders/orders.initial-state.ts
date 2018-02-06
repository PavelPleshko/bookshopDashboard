import { IOrdersState,IOrdersTable } from './orders.interface';

export function ordersState(): IOrdersState {
  return {
    data:{
    byId: {},
    allIds: []
	},
	loading:false,
	loaded:false
  	};
}