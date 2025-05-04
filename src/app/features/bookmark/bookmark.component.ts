import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bookmark } from './bookmark.model';
import { BookmarkFormComponent } from './components/bookmark-form/bookmark-form.component';
import { BookmarkStorageService } from './bookmark-storage.service';

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [CommonModule, BookmarkFormComponent],
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css'],
})
export class BookmarkComponent {
  bookmarks: Bookmark[] = [];

  constructor(private storage: BookmarkStorageService) {
    this.bookmarks = this.storage.getAll();
  }

  handleBookmarkAdded(newBookmark: Bookmark) {
    this.storage.add(newBookmark);
    this.bookmarks = this.storage.getAll();
  }
}
