import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentsucessPage } from './paymentsucess.page';

describe('PaymentsucessPage', () => {
  let component: PaymentsucessPage;
  let fixture: ComponentFixture<PaymentsucessPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PaymentsucessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
