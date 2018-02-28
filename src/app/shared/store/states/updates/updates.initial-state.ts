import { IUpdatesState,IUpdatesTable } from './updates.interface';

export function updatesState(): IUpdatesState {
  return {
    data:{
    byId: {},
    allIds: []
	},
	loading:false,
	loaded:false
  	};
}