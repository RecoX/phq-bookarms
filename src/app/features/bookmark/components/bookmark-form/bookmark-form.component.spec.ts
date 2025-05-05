import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BookmarkFormComponent } from './bookmark-form.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
/**
 * Unit tests for the BookmarkFormComponent.
 * Ensures the component behaves as expected under various scenarios.
 */

const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [BookmarkFormComponent],
    providers: [{ provide: Router, useValue: mockRouter }]
  }).compileComponents();
});

/**
 * Test suite for BookmarkFormComponent.
 */
describe('BookmarkFormComponent', () => {
  /**
   * The instance of the component being tested.
   */
  let component: BookmarkFormComponent;

  /**
   * The test fixture for the component, used to access the DOM and trigger change detection.
   */
  let fixture: ComponentFixture<BookmarkFormComponent>;

  /**
   * Sets up the testing environment before each test.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkFormComponent);
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
   * Ensures the form is marked invalid when required fields are empty.
   */
  it('should mark the form invalid when required fields are empty', () => {
    component.form.setValue({ title: '', url: '' });
    expect(component.form.invalid).toBeTrue();
  });

  /**
   * Checks that validation messages are displayed when fields are touched and invalid.
   */
  it('should show validation messages when touched and invalid', () => {
    const titleControl = component.form.get('title');
    titleControl?.markAsTouched();
    fixture.detectChanges();

    const errorText = fixture.debugElement.query(By.css('small'));
    expect(errorText).toBeTruthy();
    expect(errorText.nativeElement.textContent).toContain('Title is required');
  });

  /**
   * Verifies that the submit button is disabled when the form is invalid or the URL does not exist.
   */
  it('should disable submit button if form is invalid or urlExists is false', () => {
    component.form.setValue({ title: '', url: '' });
    component.urlExists = false;
    fixture.detectChanges();

    const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
    expect(submitButton.nativeElement.disabled).toBeTrue();
  });

  /**
   * Ensures the bookmarkAdded event is emitted with the correct data when the form is valid and submitted.
   */
  it('should emit bookmarkAdded on valid submit', fakeAsync(() => {
    const emitSpy = spyOn(component.bookmarkAdded, 'emit');
    component.form.setValue({
      title: 'Test Title',
      url: 'https://example.com',
    });

    component.onSubmit();
    tick(); // resolve async tasks

    expect(emitSpy).toHaveBeenCalled();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/result'], {
      state: {
        bookmark: jasmine.objectContaining({
          title: 'Test Title',
          url: 'https://example.com',
        }),
      },
    });

  }));

});
