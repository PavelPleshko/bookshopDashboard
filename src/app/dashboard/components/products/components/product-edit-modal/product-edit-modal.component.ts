import { Component, OnInit,Input } from '@angular/core';
import {Store} from '@ngrx/store';
import * as productActions from '../../../../../shared/store/states/products/products.actions';
import * as productSelectors from '../../../../../shared/store/states/products/products.selector';

@Component({
  selector: 'app-product-edit-modal',
  templateUrl: './product-edit-modal.component.html',
  styleUrls: ['./product-edit-modal.component.scss']
})
export class ProductEditModalComponent implements OnInit {
@Input() product;
@Input() activeCurrency = 'USD';
productObj={};
loading$;

  constructor(public store$:Store<any>){

   }

  ngOnInit() {
  	 Object.assign(this.productObj,this.product);
  	 this.store$.select(productSelectors.getProductsLoading).subscribe((loading)=>{
  	 	console.log(loading);
  	 	this.loading$ = loading;
  	 });
  }


addItem(input,arrayName){
	if(input.value.length < 3) return;
	this.product = {
		...this.product,
		[arrayName]:[...this.product[arrayName],input.value]
	};
	input.value='';
}

removeItem(index,arrayName){
	this.product = {
		...this.product,
		[arrayName]:[...this.product[arrayName]].filter((item,i)=>i != index)
	};
}


updateProduct(value,fieldName,type){
	var assignValue;
if(value){
assignValue=value;
}else{
	if(type && type=='date'){
		let year = this.productObj[fieldName].year;
		let month = this.productObj[fieldName].month-1;
		let day = this.productObj[fieldName].day+1;
		assignValue=new Date(year,month,day);
	}else{
		assignValue=this.productObj[fieldName]
	}
}
this.product = {
	...this.product,
	[fieldName]:assignValue
};
};

saveChanges(){
	this.store$.dispatch(new productActions.EditProduct(this.product));

}
}
