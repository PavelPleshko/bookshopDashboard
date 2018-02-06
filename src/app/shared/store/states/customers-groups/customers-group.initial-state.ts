import { ICustomerGroupState } from './customers-groups.interface';

export function customersGroupState(): ICustomerGroupState {
  return {
    data:{
    byId: {},
    allIds: []
	},
	loading:false,
	loaded:false
  	};
}