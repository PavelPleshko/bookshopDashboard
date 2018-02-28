import { Component, OnInit,Input,ChangeDetectionStrategy} from '@angular/core';
import {dropFromTop} from '../../../animations/animations';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush,
  animations: [dropFromTop],
  host: {'[@dropFromTop]': ''}
})
export class SidebarComponent{
  @Input() sidebarCollapsed:boolean;
 
  constructor() { }


 

}
