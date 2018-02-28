import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPrimaryChartComponent } from './dashboard-primary-chart.component';

describe('DashboardPrimaryChartComponent', () => {
  let component: DashboardPrimaryChartComponent;
  let fixture: ComponentFixture<DashboardPrimaryChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPrimaryChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPrimaryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
