import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Bookmark } from '../../bookmark.model';

/**
 * Component for displaying a confirmation message after a bookmark is submitted.
 * It retrieves the submitted bookmark from the navigation state and provides
 * a way to return to the overview page.
 */
@Component({
  selector: 'app-bookmark-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookmark-result.component.html',
  styleUrls: ['./bookmark-result.component.css'],
})
export class BookmarkResultComponent {
  bookmark: Bookmark | null = null;

  /**
   * Extracts the bookmark from navigation state on component construction.
   *
   * @param router Angular Router used to access navigation state
   */
  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.bookmark = nav?.extras?.state?.['bookmark'] ?? null;
  }

  /**
   * Navigates back to the main bookmark manager page.
   * This avoids using Location.back() to prevent returning to a paginated URL.
   */
  goBack(): void {
    this.router.navigate(['/'], { queryParams: { page: 1 } });
  }
}
