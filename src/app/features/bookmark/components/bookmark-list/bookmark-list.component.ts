import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bookmark } from '../../bookmark.model';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { validateUrlFormat, checkUrlAvailability } from '../../../../shared/validators/url.validators';

/**
 * Component for displaying a list of bookmarks.
 * Allows users to view, delete, and edit bookmarks.
 */
@Component({
  selector: 'app-bookmark-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
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
   * Event emitted when a bookmark is edited.
   * Emits the updated Bookmark object.
   */
  @Output() edit = new EventEmitter<Bookmark>();

  /**
   * ID of the bookmark currently being edited.
   */
  editingId: string | null = null;

  /**
   * Reactive form used for editing a bookmark.
   */
  editForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      url: [
        '',
        [Validators.required, validateUrlFormat],
        [checkUrlAvailability()]
      ],
    });
  }

  /**
   * Emits the delete event with the given bookmark ID.
   * @param id The ID of the bookmark to delete.
   */
  emitDelete(id: string): void {
    this.delete.emit(id);
  }

  /**
   * Activates edit mode for a bookmark and populates the edit form.
   * @param bookmark The bookmark to edit.
   */
  startEdit(bookmark: Bookmark): void {
    this.editingId = bookmark.id;
    this.editForm.setValue({
      title: bookmark.title,
      url: bookmark.url,
    });
  }

  /**
   * Cancels the edit mode and clears the form.
   */
  cancelEdit(): void {
    this.editingId = null;
    this.editForm.reset();
  }

  /**
   * Emits the edit event with the updated bookmark details.
   * @param id The ID of the bookmark to edit.
   */
  saveEdit(id: string): void {
    if (this.editForm.invalid || this.editForm.pending) return;

    // Find the original bookmark to keep the original createdAt timestamp
    const original = this.bookmarks.find(b => b.id === id);
    if (!original) return;

    this.edit.emit({
      id,
      title: this.editForm.value.title.trim(),
      url: this.editForm.value.url.trim(),
      createdAt: original.createdAt,
    });

    this.cancelEdit();
  }
}
