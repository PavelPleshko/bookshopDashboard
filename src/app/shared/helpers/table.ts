export function tableHelper(arr){
	let obj = {byId:{},allIds:[]};
	arr.forEach(item=>{
		obj.byId[item.id]=item;
		obj.allIds.push(item.id);
	})
	return obj;
}