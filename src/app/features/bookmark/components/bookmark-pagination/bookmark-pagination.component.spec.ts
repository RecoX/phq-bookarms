import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BookmarkPaginationComponent } from './bookmark-pagination.component';

describe('BookmarkPaginationComponent', () => {
  let component: BookmarkPaginationComponent;
  let fixture: ComponentFixture<BookmarkPaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookmarkPaginationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BookmarkPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate total pages correctly', () => {
    component.totalItems = 45;
    component.itemsPerPage = 20;
    expect(component.totalPages).toBe(3);
  });

  it('should emit correct page when changePage is called', () => {
    spyOn(component.pageChange, 'emit');
    component.totalItems = 100;
    component.itemsPerPage = 20;

    component.changePage(2);
    expect(component.pageChange.emit).toHaveBeenCalledWith(2);
  });

  it('should not emit pageChange if page is out of bounds', () => {
    spyOn(component.pageChange, 'emit');
    component.totalItems = 40;
    component.itemsPerPage = 20;

    component.changePage(0); // too low
    component.changePage(3); // too high

    expect(component.pageChange.emit).not.toHaveBeenCalled();
  });

  it('should render pagination buttons based on totalPages', () => {
    component.totalItems = 50;
    component.itemsPerPage = 10;
    fixture.detectChanges();

    const buttons = fixture.debugElement.queryAll(By.css('button'));
    // 5 pages + 2 for prev/next
    expect(buttons.length).toBe(7);
  });
});
