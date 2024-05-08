import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchcategoryPage } from './searchcategory.page';

describe('SearchcategoryPage', () => {
  let component: SearchcategoryPage;
  let fixture: ComponentFixture<SearchcategoryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SearchcategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
