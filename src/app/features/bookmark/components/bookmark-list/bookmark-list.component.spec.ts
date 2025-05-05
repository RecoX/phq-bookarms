import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookmarkListComponent } from './bookmark-list.component';
import { By } from '@angular/platform-browser';
import { Bookmark } from '../../bookmark.model';

/**
 * Unit tests for the BookmarkListComponent.
 * Ensures the component behaves as expected under various scenarios.
 */
describe('BookmarkListComponent', () => {
  let component: BookmarkListComponent;
  let fixture: ComponentFixture<BookmarkListComponent>;

  const testBookmarks: Bookmark[] = [
    {
      id: '1',
      title: 'Google',
      url: 'https://www.google.com',
      createdAt: new Date().toISOString(),
    },
    {
      id: '2',
      title: 'Angular',
      url: 'https://angular.dev',
      createdAt: new Date().toISOString(),
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a list of bookmarks', () => {
    // Test case for verifying the rendering of bookmarks.
    component.bookmarks = testBookmarks;
    fixture.detectChanges();

    const listItems = fixture.debugElement.queryAll(By.css('li'));
    expect(listItems.length).toBe(2);
    expect(listItems[0].nativeElement.textContent).toContain('Google');
    expect(listItems[1].nativeElement.textContent).toContain('Angular');
  });

  it('should emit delete event when delete button is clicked', () => {
    // Test case for verifying the delete event emission.
    spyOn(component.delete, 'emit');

    component.bookmarks = testBookmarks;
    fixture.detectChanges();

    const deleteButtons = fixture.debugElement.queryAll(By.css('button'));
    deleteButtons[0].nativeElement.click();

    expect(component.delete.emit).toHaveBeenCalledOnceWith('1');
  });

  it('should emit edit event with updated data and preserve createdAt', () => {
    spyOn(component.edit, 'emit');

    const original = testBookmarks[0];
    component.bookmarks = testBookmarks;
    component.startEdit(original);
    fixture.detectChanges();

    component.editTitle = 'Updated Title';
    component.editUrl = 'https://updated-url.com';
    component.saveEdit(original.id);

    expect(component.edit.emit).toHaveBeenCalledOnceWith({
      id: original.id,
      title: 'Updated Title',
      url: 'https://updated-url.com',
      createdAt: original.createdAt, // ✅ preserved
    });
  });

});
