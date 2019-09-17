import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersummaryComponent } from './ordersummary.component';

describe('OrdersummaryComponent', () => {
  let component: OrdersummaryComponent;
  let fixture: ComponentFixture<OrdersummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrdersummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrdersummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
