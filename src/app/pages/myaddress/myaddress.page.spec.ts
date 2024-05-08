import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyaddressPage } from './myaddress.page';

describe('MyaddressPage', () => {
  let component: MyaddressPage;
  let fixture: ComponentFixture<MyaddressPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyaddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
