/**
 * Unit tests for BookmarkResultComponent.
 *
 * This test suite verifies that:
 * - The component is created successfully.
 * - The submitted bookmark is displayed correctly.
 * - The goBack method triggers navigation back.
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookmarkResultComponent } from './bookmark-result.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Bookmark } from '../../bookmark.model';

describe('BookmarkResultComponent', () => {
  let component: BookmarkResultComponent;
  let fixture: ComponentFixture<BookmarkResultComponent>;

  /**
   * Mock bookmark used to simulate navigation state input.
   */
  const mockBookmark: Bookmark = {
    id: '1',
    title: 'Test Bookmark',
    url: 'https://example.com',
    createdAt: new Date().toISOString(),
  };

  /**
   * Simulated router navigation state for injecting the bookmark.
   */
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
        /**
         * Provide mocked Router and Location for dependency injection.
         */
        { provide: Router, useValue: { getCurrentNavigation: () => mockNavigation } },
        { provide: Location, useValue: { back: jasmine.createSpy('back') } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Verifies that the component is created successfully.
   */
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Verifies that the bookmark details and thank you message are rendered.
   */
  it('should display the thank you message and bookmark details', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Thank you for your submission');
    expect(compiled.textContent).toContain('Test Bookmark');
    expect(compiled.textContent).toContain('https://example.com');
  });

  /**
   * Verifies that the Location service is called when goBack is triggered.
   */
  it('should call location.back() when goBack() is invoked', () => {
    component.goBack();

    const location = TestBed.inject(Location);
    expect(location.back).toHaveBeenCalled();
  });
});
