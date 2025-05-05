import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookmarkComponent } from './bookmark.component';
import { BookmarkStorageService } from './bookmark-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Bookmark } from './bookmark.model';

/**
 * Unit tests for the BookmarkComponent.
 * 
 * This suite tests the functionality of the BookmarkComponent, including pagination,
 * rendering of bookmarks, and interaction with child components.
 */
describe('BookmarkComponent', () => {
  /**
   * The instance of the BookmarkComponent being tested.
   */
  let component: BookmarkComponent;

  /**
   * The test fixture for the BookmarkComponent.
   */
  let fixture: ComponentFixture<BookmarkComponent>;

  /**
   * The number of bookmarks displayed per page.
   */
  const BOOKMARKS_PER_PAGE = 20;

  /**
   * Mock data representing a list of bookmarks.
   */
  const mockBookmarks: Bookmark[] = Array.from({ length: 60 }, (_, i) => ({
    id: `id-${i + 1}`,
    title: `Bookmark ${i + 1}`,
    url: `https://example.com/${i + 1}`,
    createdAt: new Date().toISOString(),
  }));

  /**
   * Mock implementation of the BookmarkStorageService.
   */
  const mockStorageService = {
    getAll: () => [...mockBookmarks],
    add: jasmine.createSpy('add'),
    delete: jasmine.createSpy('delete'),
  };

  /**
   * Mock implementation of the ActivatedRoute.
   */
  const mockActivatedRoute = {
    snapshot: {
      queryParamMap: {
        get: (key: string) => (key === 'page' ? '1' : null),
      },
    },
  };

  /**
   * Mock implementation of the Router.
   */
  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkComponent],
      providers: [
        { provide: BookmarkStorageService, useValue: mockStorageService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Test to verify that the BookmarkComponent is created successfully.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test to verify that the pagination component receives the correct inputs.
   */
  it('should pass totalItems and currentPage to the pagination component', () => {
    component.bookmarksPerPage = BOOKMARKS_PER_PAGE;
    component.currentPage = 1;
    component.bookmarks = [...mockBookmarks];
    fixture.detectChanges();

    const paginationDebugEl = fixture.debugElement.query(By.css('app-bookmark-pagination'));
    const paginationInstance = paginationDebugEl.componentInstance;

    expect(paginationInstance.totalItems).toBe(60);
    expect(paginationInstance.currentPage).toBe(1);
    expect(paginationInstance.itemsPerPage).toBe(20);
  });

  /**
   * Test to verify that the currentPage is updated when the pagination emits a pageChange event.
   */
  it('should update currentPage when pagination emits pageChange', () => {
    component.bookmarksPerPage = BOOKMARKS_PER_PAGE;
    component.bookmarks = [...mockBookmarks];
    fixture.detectChanges();

    const paginationComponent = fixture.debugElement.query(By.css('app-bookmark-pagination'));
    paginationComponent.triggerEventHandler('pageChange', 2);
    fixture.detectChanges();

    expect(component.currentPage).toBe(2);
    const listItems = fixture.debugElement.queryAll(By.css('li'));
    expect(listItems[0].nativeElement.textContent).toContain('Bookmark 21');
  });

  /**
   * Test to verify that the correct bookmarks are rendered for the selected page.
   */
  it('should render the correct bookmarks for the selected page', () => {
    component.bookmarksPerPage = BOOKMARKS_PER_PAGE;
    component.currentPage = 1;
    component.bookmarks = [...mockBookmarks];
    fixture.detectChanges();

    const visibleBookmarks = component.paginatedBookmarks;
    expect(visibleBookmarks[0].title).toBe('Bookmark 1');

    const renderedItems = fixture.debugElement.queryAll(By.css('li'));
    expect(renderedItems.length).toBe(BOOKMARKS_PER_PAGE);
    expect(renderedItems[0].nativeElement.textContent).toContain('Bookmark 1');
  });
});
