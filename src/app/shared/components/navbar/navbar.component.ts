import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import {slideInOutAnimation} from '../../../animations/animations';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations:[slideInOutAnimation]
})
export class NavbarComponent implements OnInit {
@Output() themeChanged = new EventEmitter();
@Output() toggleSidebar = new EventEmitter();
@Input() currentTheme;
@Input() updates;
notificationDropdownVisible:boolean = false;
  constructor() { }

  ngOnInit() {
  }

toggleTheme(event){
	this.themeChanged.next(event);
}

toggleSidebarFunc(){
	this.toggleSidebar.next();
}

toggleNotifications(){
	this.notificationDropdownVisible = !this.notificationDropdownVisible;
}
}
