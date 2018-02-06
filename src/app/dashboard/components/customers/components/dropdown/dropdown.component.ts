import { Component, OnInit,Output,EventEmitter,Input,ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class DropdownComponent implements OnInit {
@Output() addUser = new EventEmitter();
@Input() groupList;
  constructor() { }

  ngOnInit() {
  }

addUserToGroup(groupId){
this.addUser.next(groupId);
}



}
