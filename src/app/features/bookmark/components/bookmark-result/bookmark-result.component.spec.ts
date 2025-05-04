import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkResultComponent } from './bookmark-result.component';

describe('BookmarkResultComponent', () => {
  let component: BookmarkResultComponent;
  let fixture: ComponentFixture<BookmarkResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookmarkResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
