import { Component, OnInit,Input,ChangeDetectionStrategy,ViewChild,ElementRef,
	OnChanges,Output,EventEmitter } from '@angular/core';
import {FormBuilder,FormGroup,Validators,FormArray} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/combineLatest';
import {getProductsArray} from '../../../../../shared/store/states/products/products.selector';
import {getUserArray} from '../../../../../shared/store/states/users/users.selector';
import * as ordersActions from '../../../../../shared/store/states/orders/orders.actions';
import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import {findItemBy,idUniqueAndExists} from '../../../../../shared/helpers/library';
import {ThemeService} from '../../../../../shared/services/theme.service';
import {listItemAnimation,list} from '../../../../../animations/animations';

export interface ISelectOption {
text:string;
value:string;
};

const equals = (one: NgbDateStruct, two: NgbDateStruct) =>
  one && two && two.year === one.year && two.month === one.month && two.day === one.day;

const before = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day < two.day : one.month < two.month : one.year < two.year;

const after = (one: NgbDateStruct, two: NgbDateStruct) =>
  !one || !two ? false : one.year === two.year ? one.month === two.month ? one.day === two.day
    ? false : one.day > two.day : one.month > two.month : one.year > two.year;

@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  animations:[listItemAnimation,list]
})
export class OrdersListComponent implements OnInit {
@Input() orders;
@Input() filters;
@Input() theaders;
@Input() currentPage;
@Input() pageSize = 10;
@Input() totalItems;
@Output() sort = new EventEmitter();
filterModels={};
editModeFor:number = undefined;
sorted;
dpListener;
dpickerVisible:boolean = false;
hoveredDate: NgbDateStruct;
@ViewChild('productInput') productInput:ElementRef;
@ViewChild('productEditInput') productEditInput:ElementRef;
orderForm:FormGroup;
formShown:boolean = false;
products;
users;
chipsArray=[];
statusOptions:ISelectOption[];
found=this.totalItems;

  constructor(public fb:FormBuilder,public store$:Store<any>,public themeService:ThemeService){}

  ngOnInit() {

this.initFilters();
this.statusOptions = [
{text:'Submitted',value:'submitted'},
{text:'Awaiting payment',value:'awaiting payment'},
{text:'Finalized',value:'finalized'},
{text:'Cancelled',value:'cancelled'}
];

this.store$.select(getProductsArray).combineLatest(this.store$.select(getUserArray),(products,users)=>{
	return {products:products,users:users};
}).subscribe(data=>{
	let productsData = data.products.map((product)=>{
		return {id:product.id,title:product.title,price:product.price}
	});
	let usersData = data.users.map((user)=>{
		return {id:user.id,name:user.name};
	})

	this.products = productsData;
	this.users = usersData;
});

  	this.orderForm = this.fb.group({
  		id:[''], //assigned automatically
  		buyer:['',Validators.required],
  		products:[[],Validators.required],
  		amount:[null,Validators.required],
  		total:[null,Validators.required],
  		status:['',Validators.required],
  		lastUpdated:[null] //assigned automatically
  	});
  }


initFilters(){
	this.filters.forEach((filter)=>{
		this.filterModels[filter.title]={
			value:'',
			type:filter.type
		};
	})
	this.filterModels['lastUpdated']={
		value:{fromDate:'',toDate:''},
		type:'date'
	}
}

updateNumberOfEntries(num){
	if(num == 0){
		num = 1;
		this.found = 0;
		this.totalItems = num;
	}else{

		this.totalItems = num;
		this.found = num;
	}

}



showForm(){
	if(!this.formShown){
		this.resetData();
		this.formShown = true;
	}
}

hideForm(){
	if(this.formShown){
		this.formShown = false;
	}
}

onSelectProduct(event,form:FormGroup){
	event.preventDefault();
	let input;
	let product = findItemBy(event.item,this.products,'title');
	this.chipsArray.push(product);
	if(this.editModeFor){
		input = this.productEditInput.nativeElement;
	}else{
		input = this.productInput.nativeElement;
	}
	input.value = '';
	input.focus();
	let total = this.calculateTotalPrice(form,product.price);

	let obj = {
		total:total,
		products:this.chipsArray,
		amount:this.chipsArray.length,
	};
	
	this.updateForm(obj,form);
}

onSelectUser(event,form:FormGroup){
	let buyerId = findItemBy(event.item,this.users,'name').id;
	let obj = {
		buyer:buyerId
	};
	this.updateForm(obj,form);
}

updateForm(obj,form:FormGroup){
form.patchValue(obj);
}

removeChip(i,form:FormGroup){
	let productPrice = -(this.chipsArray.splice(i,1))[0].price;
	let total = this.calculateTotalPrice(form,productPrice);
	let obj = {
		total:total,
		products:this.chipsArray,
		amount:this.chipsArray.length,
	};
	this.updateForm(obj,form);
}



formatFormValues(form:FormGroup,options){
	const obj = {};

	for(const key in options){
		let curr;
		if(key == 'buyer'){
			obj[key] = findItemBy(options[key],this.users,'name').id;
		}else{
			if(options[key] instanceof Array){
				obj[key] = options[key].map((item)=>item.id);
			}else{
				obj[key] = options[key];
			}		
		}
	}
	let id = form.get('id').value;
	if(this.editModeFor){
		obj['id'] = id;
	}else{
		obj['id'] = idUniqueAndExists(id,this.orders) ? id : this.orders.length+1;
	}
	
	this.updateForm(obj,form);
}

calculateTotalPrice(form:FormGroup,itemPrice){
let total = form.get('total').value + itemPrice;
if(total <= 0){
	total = 0;
};
return total;
}

addOrder(){
	if(this.orderForm.valid){
		let formObj ={
			products:this.chipsArray,
			buyer:this.orderForm.get('buyer').value,
			lastUpdated:new Date()
		};
		this.formatFormValues(this.orderForm,formObj);
		this.store$.dispatch(new ordersActions.AddOrder(this.orderForm.value));
		this.resetData();
	}
}

editOrder(orderId){
	this.resetData();
	this.editModeFor = orderId;
	this.initDataForOrder(orderId);
}

cancelEditOrder(){
	this.resetData();
	this.editModeFor=undefined;
}
saveOrder(){
	if(this.orderForm.valid){
			let formObj ={
			products:this.chipsArray,
			buyer:this.orderForm.get('buyer').value,
			lastUpdated:new Date()
		};
		this.formatFormValues(this.orderForm,formObj);
		this.store$.dispatch(new ordersActions.EditOrder(this.orderForm.value));
		this.resetData();
	}

}

deleteOrder(orderId:string){
this.store$.dispatch(new ordersActions.RemoveOrder(orderId))
}

resetData(){
	this.orderForm.reset();
	this.chipsArray = [];
	if(this.editModeFor) this.editModeFor=undefined;
	if(this.formShown) this.hideForm();
}

initDataForOrder(orderId){
	if(orderId){
		let order = findItemBy(orderId,this.orders,'id');
		order.products.forEach((productTitle)=>{
			let product = findItemBy(productTitle,this.products,'title');
			if(product){
				this.chipsArray.push(product);
			}
		})
		this.updateForm(order,this.orderForm); //insert order which is being edited in the form
	}
}

toggleDpicker(){
	this.dpickerVisible = !this.dpickerVisible;
}

trackByItemId(idx,item){
	return item.id;
}

trackByItemIdx(idx,item){
	return idx;
}

sortBy(theaderName){
if(this.sorted){
	if(this.sorted == theaderName){
		this.sort.next({field:theaderName,isAsc:true})
	}else{
		this.sort.next({field:theaderName,isAsc:false})
	}
	this.sorted = undefined;
}else{
	this.sort.next({field:theaderName,isAsc:false});
	this.sorted = theaderName;
}
}

 productsTypeahead = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.products.filter(v => v.title.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 5))
      .map((p)=>p.map(product=>product.title));

  usersTypeahead = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? []
        : this.users.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 5))
      .map((p)=>p.map(user=>user.name));


     //daterange filter
      onDateChange(date: NgbDateStruct) {
      	let from = this.filterModels['lastUpdated'].value.fromDate;
      	let to =this.filterModels['lastUpdated'].value.toDate;
    if (!from && !to) {
      this.filterModels['lastUpdated'].value.fromDate = date;
    } else if (from && !to && after(date, from)) {
     this.filterModels['lastUpdated'].value.toDate = date;
     this.dpickerVisible = false;
    } else {
      this.filterModels['lastUpdated'].value.toDate = '';
      this.filterModels['lastUpdated'].value.fromDate = date;
    }
  }


  isHovered = date => this.filterModels['lastUpdated'].value.fromDate
   && !this.filterModels['lastUpdated'].value.toDate
    && this.hoveredDate && after(date, this.filterModels['lastUpdated'].value.fromDate)
     && before(date, this.hoveredDate);

  isInside = date => after(date, this.filterModels['lastUpdated'].value.fromDate) 
  && before(date, this.filterModels['lastUpdated'].value.toDate);

  isFrom = date => equals(date, this.filterModels['lastUpdated'].value.fromDate);

  isTo = date => equals(date, this.filterModels['lastUpdated'].value.toDate);
}
