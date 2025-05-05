import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bookmark } from '../../bookmark.model';
import { FormsModule } from '@angular/forms';

/**
 * Component for displaying a list of bookmarks.
 * Allows users to view and delete bookmarks.
 */
@Component({
  selector: 'app-bookmark-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  // Add an EventEmitter for the edit event
  @Output() edit = new EventEmitter<Bookmark>();

  editingId: string | null = null;
  editTitle: string = '';
  editUrl: string = '';

  /**
   * Emits the delete event with the given bookmark ID.
   * @param id The ID of the bookmark to delete.
   */
  emitDelete(id: string): void {
    this.delete.emit(id);
  }

  /**
   * Emits the edit event with the given bookmark details.
   * @param bookmark The bookmark to edit.
   */
  startEdit(bookmark: Bookmark): void {
    this.editingId = bookmark.id;
    this.editTitle = bookmark.title;
    this.editUrl = bookmark.url;
  }

  /**
   * Cancels the edit mode and clears the editing fields.
   */
  cancelEdit(): void {
    this.editingId = null;
    this.editTitle = '';
    this.editUrl = '';
  }

  /**
   * Emits the edit event with the updated bookmark details.
   * @param id The ID of the bookmark to edit.
   */
  saveEdit(id: string): void {
    if (!this.editTitle.trim() || !this.editUrl.trim()) return;

    // Find the original bookmark to keep the original createdAt timestamp
    const original = this.bookmarks.find(b => b.id === id);
    if (!original) return;

    this.edit.emit({
      id,
      title: this.editTitle.trim(),
      url: this.editUrl.trim(),
      createdAt: original.createdAt,
    });

    this.cancelEdit();
  }

}
