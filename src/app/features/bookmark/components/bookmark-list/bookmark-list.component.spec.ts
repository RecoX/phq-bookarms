import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookmarkListComponent } from './bookmark-list.component';
import { By } from '@angular/platform-browser';
import { Bookmark } from '../../bookmark.model';
import { ReactiveFormsModule, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { AbstractControl, ValidationErrors } from '@angular/forms';

// Fake async validator that resolves immediately with null (no error)
function fakeAsyncUrlValidator() {
  return (control: AbstractControl): Promise<ValidationErrors | null> =>
    Promise.resolve(null);
}

/**
 * Unit tests for the BookmarkListComponent.
 * Ensures the component renders bookmarks correctly and emits the correct events.
 */
describe('BookmarkListComponent', () => {
  let component: BookmarkListComponent;
  let fixture: ComponentFixture<BookmarkListComponent>;

  // Sample bookmarks for testing
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
      imports: [BookmarkListComponent, ReactiveFormsModule],
      providers: [
        {
          provide: NG_ASYNC_VALIDATORS,
          useValue: fakeAsyncUrlValidator(),
          multi: true,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkListComponent);
    component = fixture.componentInstance;
    component.bookmarks = testBookmarks;
    fixture.detectChanges();
  });


  /**
   * Test: Component initializes correctly.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test: Should render all bookmarks in the list.
   */
  it('should render a list of bookmarks', () => {
    const listItems = fixture.debugElement.queryAll(By.css('li'));
    expect(listItems.length).toBe(2);
    expect(listItems[0].nativeElement.textContent).toContain('Google');
    expect(listItems[1].nativeElement.textContent).toContain('Angular');
  });

  /**
   * Test: Clicking delete should emit the correct bookmark ID.
   */
  it('should emit delete event when delete button is clicked', () => {
    spyOn(component.delete, 'emit');
    const deleteButtons = fixture.debugElement.queryAll(By.css('.delete-btn'));
    deleteButtons[0].nativeElement.click();
    expect(component.delete.emit).toHaveBeenCalledOnceWith('1');
  });

  /**
   * Test: Should not emit edit if form is invalid.
   */
  it('should not emit edit event if form is invalid', () => {
    spyOn(component.edit, 'emit');

    const original = testBookmarks[0];
    component.startEdit(original);
    component.editForm.setValue({
      title: '', // invalid
      url: '',   // invalid
    });
    fixture.detectChanges();

    component.saveEdit(original.id);
    expect(component.edit.emit).not.toHaveBeenCalled();
  });
});
