import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookmarkResultComponent } from './bookmark-result.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Bookmark } from '../../bookmark.model';

describe('BookmarkResultComponent', () => {
  let component: BookmarkResultComponent;
  let fixture: ComponentFixture<BookmarkResultComponent>;

  // Mock bookmark used to simulate router navigation state
  const mockBookmark: Bookmark = {
    id: '1',
    title: 'Test Bookmark',
    url: 'https://example.com',
    createdAt: new Date().toISOString(),
  };

  // Mock router navigation state to inject the bookmark as route state
  const mockNavigation = {
    extras: {
      state: {
        bookmark: mockBookmark,
      },
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkResultComponent],
      providers: [
        // Inject mocked router and location services
        { provide: Router, useValue: { getCurrentNavigation: () => mockNavigation } },
        { provide: Location, useValue: { back: jasmine.createSpy('back') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the thank you message and bookmark details', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    // Ensure the message and submitted bookmark details appear in the DOM
    expect(compiled.textContent).toContain('Thank you for your submission');
    expect(compiled.textContent).toContain('Test Bookmark');
    expect(compiled.textContent).toContain('https://example.com');
  });

  it('should call location.back() when goBack() is invoked', () => {
    // Trigger the back navigation
    component.goBack();

    // Verify the Location service's back method was called
    const location = TestBed.inject(Location);
    expect(location.back).toHaveBeenCalled();
  });
});
