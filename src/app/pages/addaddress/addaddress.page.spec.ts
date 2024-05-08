import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddaddressPage } from './addaddress.page';

describe('AddaddressPage', () => {
  let component: AddaddressPage;
  let fixture: ComponentFixture<AddaddressPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddaddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
