import { Component, OnInit,Input,Output,EventEmitter,
	ChangeDetectionStrategy,OnChanges,SimpleChanges,ViewChild} from '@angular/core';
import {
    DomSanitizer,
    SafeStyle
} from '@angular/platform-browser';

@Component({
  selector: 'app-customer-single',
  templateUrl: './customer-single.component.html',
  styleUrls: ['./customer-single.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class CustomerSingleComponent implements OnInit,OnChanges{
@Input() customer;
@Input() groupList;
image:SafeStyle;
@Output() addUser:EventEmitter<{userId:string,groupId:string}> = new EventEmitter<{userId:string,groupId:string}>();





  constructor(public sanitization:DomSanitizer) { }

  ngOnInit() {
  	this.image = this.sanitization.bypassSecurityTrustStyle(`url(/assets/img/customers/${this.customer.thumbnail}.jpg)`);
  }

ngOnChanges(changes:SimpleChanges){
this.groupList.map((group)=>{
	group.in = false;
if(this.customer.groups.includes(group.id)){
	group.in = true;
}
return group;
})
}




addUserToGroup(groupId){
this.addUser.next({userId:this.customer.id,groupId:groupId});
}





  
}
