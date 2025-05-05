import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Component for handling pagination in the bookmark feature.
 * Displays pagination controls and emits events when the page changes.
 */
@Component({
  selector: 'app-bookmark-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookmark-pagination.component.html',
  styleUrls: ['./bookmark-pagination.component.css'],
})
export class BookmarkPaginationComponent {
  /**
   * Total number of items to paginate.
   */
  @Input() totalItems = 0;

  /**
   * Current active page.
   */
  @Input() currentPage = 1;

  /**
   * Number of items displayed per page.
   */
  @Input() itemsPerPage = 20;

  /**
   * Event emitted when the page changes.
   */
  @Output() pageChange = new EventEmitter<number>();

  /**
   * Calculates the total number of pages based on totalItems and itemsPerPage.
   */
  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  /**
   * Generates an array of page numbers for pagination controls.
   */
  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  /**
   * Changes the current page and emits the pageChange event.
   * @param page The page number to navigate to.
   */
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
