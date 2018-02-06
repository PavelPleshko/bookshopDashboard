import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersGroupListComponent } from './customers-group-list.component';

describe('CustomersGroupListComponent', () => {
  let component: CustomersGroupListComponent;
  let fixture: ComponentFixture<CustomersGroupListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomersGroupListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomersGroupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
