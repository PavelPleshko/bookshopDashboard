import {Pipe,PipeTransform} from '@angular/core';

@Pipe({name:'pagination',pure:true})


export class PaginationPipe implements PipeTransform {
	transform(list:any[],currentPage,pageSize):any{
		if(!currentPage || !pageSize) return list;

	let transformedList = [];
	const start = (currentPage-1)*pageSize;
	const end = (currentPage-1)*pageSize+pageSize;	
	transformedList = list.slice(start,end);
	return transformedList;

	}
}
