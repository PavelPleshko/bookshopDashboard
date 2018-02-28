import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import {FormBuilder,Validators,FormGroup} from '@angular/forms';
@Component({
  selector: 'app-add-group-form',
  templateUrl: './add-group-form.component.html',
  styleUrls: ['./add-group-form.component.scss']
})
export class AddGroupFormComponent{
@Output() submitted = new EventEmitter();
@Input() colors;
addGroupForm:FormGroup;
  constructor(public fb:FormBuilder) {
    this.addGroupForm = this.fb.group({
      title:['',Validators.required],
      description:['',Validators.required],
      style:['',Validators.required]
    })
   }



  submit(){
    console.log(this.addGroupForm)
  	if(this.addGroupForm.valid){
  		this.submitted.next(this.addGroupForm.value);
  	}
  }

  cancel(){
  	this.submitted.next(false);
  }
}
