import { Component, OnInit,Input,ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-order-single',
  templateUrl: './order-single.component.html',
  styleUrls: ['./order-single.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class OrderSingleComponent implements OnInit {
@Input() order;
  constructor() { }

  ngOnInit() {
  }

}
