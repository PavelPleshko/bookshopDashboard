import { Component, OnInit,Input,ChangeDetectionStrategy,ViewChild,ElementRef,Renderer2,Output,EventEmitter } from '@angular/core';
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
  changeDetection:ChangeDetectionStrategy.OnPush
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
sorted;
dpListener;
dpickerVisible:boolean = false;
hoveredDate: NgbDateStruct;
@ViewChild('productInput') productInput:ElementRef;
orderForm:FormGroup;
formShown:boolean = false;
products;
users;
chipsArray=[];
statusOptions:ISelectOption[];
  constructor(public fb:FormBuilder,public store$:Store<any>,public renderer:Renderer2) {
 
   }

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
  		createdAt:[null] //assigned automatically
  	});
  }


initFilters(){
	this.filters.forEach((filter)=>{
		this.filterModels[filter.title]={
			value:'',
			type:filter.type
		};
	})
	this.filterModels['createdAt']={
		value:{fromDate:'',toDate:''},
		type:'date'
	}
	console.log(this.filterModels);
}

updateNumberOfEntries(num){
	if(num == 0) num = 1;
	this.totalItems = num;
}



showForm(){
	if(!this.formShown){
		this.resetData();
		this.formShown = true;
	}
}

hideForm(){
	if(this.formShown){
		this.resetData();
		this.formShown = false;
	}
}

onSelectProduct(event,form:FormGroup){
	event.preventDefault();
	let product = this.findItemBy(event.item,this.products,'title');
	this.chipsArray.push(product);
	this.productInput.nativeElement.value = '';
	this.productInput.nativeElement.focus();
	let total = this.calculateTotalPrice(form,product.price);

	let obj = {
		total:total,
		products:this.chipsArray,
		amount:this.chipsArray.length,
	};
	
	this.updateForm(obj,form);
}

onSelectUser(event,form:FormGroup){
	let buyerId = this.findItemBy(event.item,this.users,'name').id;
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
			obj[key] = this.findItemBy(options[key],this.users,'name').id;
		}else{
			if(options[key] instanceof Array){
				obj[key] = options[key].map((item)=>item.id);
			}else{
				obj[key] = options[key];
			}		
		}
	}
	let id = form.get('id').value;
	obj['id'] = this.idUniqueAndExists(id) ? id : this.orders.length+1;
	form.patchValue(obj);
}

calculateTotalPrice(form:FormGroup,itemPrice){
let total = form.get('total').value + itemPrice;
if(total <= 0){
	total = 0;
};
return total;
}

findItemBy(searchItem,items,type){
	return items.find(item=>item[type].toLowerCase() == searchItem.toLowerCase());
}

idUniqueAndExists(id){
	if(id){
		return this.orders.every(order=>order.id != id);
	}else{
		return false;
	}
}

addOrder(){
	if(this.orderForm.valid){
		let formObj ={
			products:this.chipsArray,
			buyer:this.orderForm.get('buyer').value,
			createdAt:new Date()
		};
		this.formatFormValues(this.orderForm,formObj);
		this.store$.dispatch(new ordersActions.AddOrder(this.orderForm.value));
		this.resetData();
	}
}

deleteOrder(orderId:string){
this.store$.dispatch(new ordersActions.RemoveOrder(orderId))
}

resetData(){
	this.orderForm.reset();
	this.chipsArray = [];
}

toggleDpicker(){
	this.dpickerVisible = !this.dpickerVisible;
}

trackByFn(idx,item){
	return item.id;
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
      	let from = this.filterModels['createdAt'].value.fromDate;
      	let to =this.filterModels['createdAt'].value.toDate;
    if (!from && !to) {
      this.filterModels['createdAt'].value.fromDate = date;
    } else if (from && !to && after(date, from)) {
     this.filterModels['createdAt'].value.toDate = date;
     this.dpickerVisible = false;
    } else {
      this.filterModels['createdAt'].value.toDate = '';
      this.filterModels['createdAt'].value.fromDate = date;
    }
  }


  isHovered = date => this.filterModels['createdAt'].value.fromDate
   && !this.filterModels['createdAt'].value.toDate
    && this.hoveredDate && after(date, this.filterModels['createdAt'].value.fromDate)
     && before(date, this.hoveredDate);

  isInside = date => after(date, this.filterModels['createdAt'].value.fromDate) 
  && before(date, this.filterModels['createdAt'].value.toDate);

  isFrom = date => equals(date, this.filterModels['createdAt'].value.fromDate);

  isTo = date => equals(date, this.filterModels['createdAt'].value.toDate);
}
