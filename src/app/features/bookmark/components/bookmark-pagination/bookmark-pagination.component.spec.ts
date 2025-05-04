import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkPaginationComponent } from './bookmark-pagination.component';

describe('BookmarkPaginationComponent', () => {
  let component: BookmarkPaginationComponent;
  let fixture: ComponentFixture<BookmarkPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkPaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
