import { Component, OnInit,Input } from '@angular/core';
import {ProductEditModalComponent} from '../product-edit-modal/product-edit-modal.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product-single',
  templateUrl: './product-single.component.html',
  styleUrls: ['./product-single.component.scss'],
  entryComponents:[ProductEditModalComponent]
})
export class ProductSingleComponent implements OnInit {
@Input() product;
@Input() activeCurrency = 'USD';
  constructor(public modalService:NgbModal) { }

  ngOnInit() {
  }

  openModal(){
	const ref = this.modalService.open(ProductEditModalComponent,{size:'lg'});
	ref.componentInstance.product = this.product;
  }

}
