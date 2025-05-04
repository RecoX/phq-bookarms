import { Injectable } from '@angular/core';
import { Bookmark } from './bookmark.model';

const STORAGE_KEY = 'bookmarks';

@Injectable({
  providedIn: 'root',
})
export class BookmarkStorageService {
  constructor() {}

  getAll(): Bookmark[] {
    const json = localStorage.getItem(STORAGE_KEY);
    return json ? (JSON.parse(json) as Bookmark[]) : [];
  }

  saveAll(bookmarks: Bookmark[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }

  add(bookmark: Bookmark): void {
    const bookmarks = this.getAll();
    this.saveAll([...bookmarks, bookmark]);
  }

  update(updated: Bookmark): void {
    const bookmarks = this.getAll();
    const newList = bookmarks.map(b => (b.id === updated.id ? updated : b));
    this.saveAll(newList);
  }

  delete(id: string): void {
    const bookmarks = this.getAll();
    const newList = bookmarks.filter(b => b.id !== id);
    this.saveAll(newList);
  }

  getById(id: string): Bookmark | undefined {
    return this.getAll().find(b => b.id === id);
  }
}
