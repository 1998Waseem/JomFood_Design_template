import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddcreditPage } from './addcredit.page';

describe('AddcreditPage', () => {
  let component: AddcreditPage;
  let fixture: ComponentFixture<AddcreditPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AddcreditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
