import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyreviewsPage } from './myreviews.page';

describe('MyreviewsPage', () => {
  let component: MyreviewsPage;
  let fixture: ComponentFixture<MyreviewsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyreviewsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
