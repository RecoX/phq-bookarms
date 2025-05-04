import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bookmark-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookmark-pagination.component.html',
  styleUrls: ['./bookmark-pagination.component.css'],
})
export class BookmarkPaginationComponent {
  @Input() totalItems = 0;
  @Input() currentPage = 1;
  @Input() itemsPerPage = 20;
  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.itemsPerPage);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.pageChange.emit(page);
    }
  }
}
