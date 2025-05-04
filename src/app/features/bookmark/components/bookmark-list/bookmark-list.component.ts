import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Bookmark } from '../../bookmark.model';

@Component({
  selector: 'app-bookmark-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.css'],
})
export class BookmarkListComponent {
  @Input() bookmarks: Bookmark[] = [];
  @Output() delete = new EventEmitter<string>();

  emitDelete(id: string): void {
    this.delete.emit(id);
  }
}
