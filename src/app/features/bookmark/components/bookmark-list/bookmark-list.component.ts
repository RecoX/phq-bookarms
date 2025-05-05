import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bookmark } from '../../bookmark.model';

/**
 * Component for displaying a list of bookmarks.
 * Allows users to view and delete bookmarks.
 */
@Component({
  selector: 'app-bookmark-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.css'],
})
export class BookmarkListComponent {
  /**
   * List of bookmarks to display.
   */
  @Input() bookmarks: Bookmark[] = [];

  /**
   * Event emitted when a bookmark is deleted.
   * Emits the ID of the deleted bookmark.
   */
  @Output() delete = new EventEmitter<string>();

  /**
   * Emits the delete event with the given bookmark ID.
   * @param id The ID of the bookmark to delete.
   */
  emitDelete(id: string): void {
    this.delete.emit(id);
  }
}
