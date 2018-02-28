import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSingleComponent } from './update-single.component';

describe('UpdateSingleComponent', () => {
  let component: UpdateSingleComponent;
  let fixture: ComponentFixture<UpdateSingleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSingleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
