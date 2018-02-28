import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardInfoCardComponent } from './dashboard-info-card.component';

describe('DashboardInfoCardComponent', () => {
  let component: DashboardInfoCardComponent;
  let fixture: ComponentFixture<DashboardInfoCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardInfoCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardInfoCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
