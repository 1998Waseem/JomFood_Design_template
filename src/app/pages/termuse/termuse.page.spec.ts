import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TermusePage } from './termuse.page';

describe('TermusePage', () => {
  let component: TermusePage;
  let fixture: ComponentFixture<TermusePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(TermusePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
