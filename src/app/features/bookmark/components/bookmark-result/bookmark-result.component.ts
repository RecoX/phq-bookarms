import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { Bookmark } from '../../bookmark.model';

@Component({
  selector: 'app-bookmark-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookmark-result.component.html',
  styleUrls: ['./bookmark-result.component.css'],
})
export class BookmarkResultComponent {
  bookmark: Bookmark | null = null;

  // Constructor initializes the component with the router and location services.
  // It retrieves the bookmark data passed through the router's navigation state.
  // If no bookmark is found, it defaults to null.
  constructor(private router: Router, private location: Location) {
    const nav = this.router.getCurrentNavigation();
    this.bookmark = nav?.extras?.state?.['bookmark'] ?? null;
  }

  // Method to navigate back to the previous page using Angular's Location service.
  goBack(): void {
    this.location.back();
  }
}
