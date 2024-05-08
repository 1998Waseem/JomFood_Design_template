import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewsroomPage } from './newsroom.page';

describe('NewsroomPage', () => {
  let component: NewsroomPage;
  let fixture: ComponentFixture<NewsroomPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NewsroomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
