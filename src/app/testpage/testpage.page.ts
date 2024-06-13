import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-testpage',
  templateUrl: './testpage.page.html',
  styleUrls: ['./testpage.page.scss'],
})
export class TestpagePage {
  @ViewChild('content', { read: ElementRef })
  content!: ElementRef;

  categories: string[] = ['Category 1', 'Category 2', 'Category 3'];
  items: string[][] = [
    ['Item 1-1', 'Item 1-2', 'Item 1-3'],
    ['Item 2-1', 'Item 2-2', 'Item 2-3'],
    ['Item 3-1', 'Item 3-2', 'Item 3-3'],
  ];
  visibleCategory: any='';

  constructor() {}

  ngAfterViewInit() {
    this.content.nativeElement.addEventListener('scroll', this.onScroll.bind(this));
  }

  onScroll() {
    const contentBounds = this.content.nativeElement.getBoundingClientRect();
    for (let i = 0; i < this.categories.length; i++) {
      const categoryElement = document.getElementById(`category-${i}`);
      if (categoryElement) { // Check if categoryElement is not null
        const categoryBounds = categoryElement.getBoundingClientRect();
        if (
          categoryBounds.top >= contentBounds.top &&
          categoryBounds.bottom <= contentBounds.bottom
        ) {
          this.visibleCategory = this.categories[i];
          break;
        }
      }
    }
  }
  
}
 



