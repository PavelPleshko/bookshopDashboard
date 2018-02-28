import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-update-single',
  templateUrl: './update-single.component.html',
  styleUrls: ['./update-single.component.scss']
})
export class UpdateSingleComponent implements OnInit {
@Input() update;
  constructor() { }

  ngOnInit() {
  }

}
