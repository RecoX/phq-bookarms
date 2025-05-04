import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bookmark } from './bookmark.model';
import { BookmarkFormComponent } from './components/bookmark-form/bookmark-form.component';
import { BookmarkStorageService } from './bookmark-storage.service';
import { BookmarkPaginationComponent } from './components/bookmark-pagination/bookmark-pagination.component';
import { BookmarkListComponent } from './components/bookmark-list/bookmark-list.component';

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [CommonModule, BookmarkFormComponent, BookmarkPaginationComponent, BookmarkListComponent],
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css'],
})
export class BookmarkComponent {
  bookmarks: Bookmark[] = [];
  currentPage = 1;
  bookmarksPerPage = 20;

  constructor(private storage: BookmarkStorageService) {
    this.bookmarks = this.storage.getAll();
  }

  get paginatedBookmarks(): Bookmark[] {
    const start = (this.currentPage - 1) * this.bookmarksPerPage;
    const end = start + this.bookmarksPerPage;
    return this.bookmarks.slice(start, end);
  }

  get totalPages(): number {
    return Math.ceil(this.bookmarks.length / this.bookmarksPerPage);
  }

  setPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
  }

  handleBookmarkAdded(newBookmark: Bookmark) {
    this.storage.add(newBookmark);
    this.bookmarks = this.storage.getAll();
    this.currentPage = this.totalPages; // jump to last page
  }

  deleteBookmark(id: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this bookmark?');
    if (confirmDelete) {
      this.storage.delete(id);
      this.bookmarks = this.storage.getAll();
    }
  }

}
