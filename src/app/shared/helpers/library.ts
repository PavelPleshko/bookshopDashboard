 export function getDate(month,year,day?){
	let defaultOpts = {
		hms:'00:00:00',
		date:day || '01'
	}
	let dateStr = `${month} ${defaultOpts.date}, ${year} ${defaultOpts.hms}`;
	return new Date(dateStr);
}


export function stringSortFunction(a,b,isAsc){
	if(isAsc){
		return a > b ? -1 : 1;
	}else{
		return a < b ? -1 : 1;
	}
}

export function numSortFunction(a,b,isAsc){
	return isAsc ? a + b : a - b;
}


export function findItemBy(searchItem,items,type){
	if(typeof searchItem == 'string'){
		return items.find(item=>item[type].toLowerCase() == searchItem.toLowerCase());
	}else{
		return items.find(item=>item[type] == searchItem);
	}
	
}

export function idUniqueAndExists(id,arr){
	if(id){
		return arr.every(item=>item.id != id);
	}else{
		return false;
	}
}