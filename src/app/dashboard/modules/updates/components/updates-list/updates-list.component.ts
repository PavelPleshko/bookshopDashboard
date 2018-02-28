import { Component, OnInit,Input,ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-updates-list',
  templateUrl: './updates-list.component.html',
  styleUrls: ['./updates-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class UpdatesListComponent implements OnInit {
@Input() updates;
  constructor() { }

  ngOnInit() {
  }

}
