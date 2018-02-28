import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardMapChartComponent } from './dashboard-map-chart.component';

describe('DashboardMapChartComponent', () => {
  let component: DashboardMapChartComponent;
  let fixture: ComponentFixture<DashboardMapChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardMapChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardMapChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
