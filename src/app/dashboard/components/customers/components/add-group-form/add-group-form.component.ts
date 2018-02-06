import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';

@Component({
  selector: 'app-add-group-form',
  templateUrl: './add-group-form.component.html',
  styleUrls: ['./add-group-form.component.scss']
})
export class AddGroupFormComponent implements OnInit {
@Output() submitted = new EventEmitter();
@Input() colors;
  constructor() { }

  ngOnInit() {
  }

  submit(form){
  	console.log(form);
  	if(form.valid){
  		this.submitted.next(form.value);
  	}
  }

  cancel(){
  	this.submitted.next(false);
  }
}
