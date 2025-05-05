import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bookmark } from './bookmark.model';
import { BookmarkFormComponent } from './components/bookmark-form/bookmark-form.component';
import { BookmarkStorageService } from './bookmark-storage.service';
import { BookmarkPaginationComponent } from './components/bookmark-pagination/bookmark-pagination.component';
import { BookmarkListComponent } from './components/bookmark-list/bookmark-list.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [CommonModule, BookmarkFormComponent, BookmarkPaginationComponent, BookmarkListComponent],
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css'],
})

// BookmarkComponent is the main component for managing bookmarks.
// It handles the display, addition, and deletion of bookmarks.
// It uses the BookmarkStorageService to manage the bookmarks in local storage.
// It also provides pagination functionality to navigate through the list of bookmarks.
// The component is designed to be standalone, allowing for easier integration into other parts of the application.
export class BookmarkComponent {
  bookmarks: Bookmark[] = [];
  currentPage = 1;
  bookmarksPerPage = 20;

  // The constructor initializes the component with the BookmarkStorageService.
  // It also reads the initial page from the query parameter in the URL.
  // If the page number is not valid, it defaults to 1.
  // The ActivatedRoute and Router services are injected to handle routing and navigation.
  // The bookmarks are fetched from the storage service and stored in the bookmarks array.
  constructor(
    private storage: BookmarkStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bookmarks = this.storage.getAll();

    // Read initial page from query param
    const pageFromUrl = Number(this.route.snapshot.queryParamMap.get('page'));
    this.currentPage = !isNaN(pageFromUrl) && pageFromUrl > 0 ? pageFromUrl : 1;
  }


  // The paginatedBookmarks getter calculates the bookmarks to display on the current page.
  // It slices the bookmarks array based on the current page and bookmarks per page.
  get paginatedBookmarks(): Bookmark[] {
    const start = (this.currentPage - 1) * this.bookmarksPerPage;
    const end = start + this.bookmarksPerPage;
    return this.bookmarks.slice(start, end);
  }

  // The totalPages getter calculates the total number of pages based on the total number of bookmarks and bookmarks per page.
  // It uses Math.ceil to round up to the nearest whole number.
  // This ensures that any remaining bookmarks that don't fill a complete page are still counted as a page.
  get totalPages(): number {
    return Math.ceil(this.bookmarks.length / this.bookmarksPerPage);
  }

  // The setPage method is used to change the current page.
  // It takes a page number as an argument and checks if it's within the valid range.
  // If valid, it updates the current page and navigates to the new page using the router.
  setPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page },
      queryParamsHandling: 'merge', // preserve other query params if any
      replaceUrl: true, // avoids cluttering browser history
    });
  }

  // The handleBookmarkAdded method is called when a new bookmark is added.
  // It takes the new bookmark as an argument, adds it to the storage, and updates the bookmarks array.
  // It also sets the current page to the last page, ensuring that the user sees the newly added bookmark immediately.
  handleBookmarkAdded(newBookmark: Bookmark) {
    this.storage.add(newBookmark);
    this.refreshBookmarks();
  }

  // The deleteBookmark method is called when a bookmark is deleted.
  // It takes the bookmark ID as an argument and prompts the user for confirmation before deleting.
  // If the user confirms, it deletes the bookmark from the storage and updates the bookmarks array.
  deleteBookmark(id: string): void {
    const confirmDelete = confirm('Are you sure you want to delete this bookmark?');
    if (confirmDelete) {
      this.storage.delete(id);
      this.refreshBookmarks();
    }
  }

  // The refreshBookmarks method is called to refresh the bookmarks array.
  // It fetches the latest bookmarks from the storage service and updates the bookmarks array.
  editBookmark(updated: Bookmark): void {
    this.storage.update(updated);
    this.refreshBookmarks();
  }

  /**
  * Refreshes the bookmarks from storage and updates the local bookmarks array.
  */
  private refreshBookmarks(): void {
    this.bookmarks = this.storage.getAll();
  }
}
