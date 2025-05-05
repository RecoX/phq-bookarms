import { Injectable } from '@angular/core';
import { Bookmark } from './bookmark.model';

const STORAGE_KEY = 'bookmarks';

/**
 * Service responsible for managing bookmarks using localStorage.
 * Provides methods to retrieve, add, update, and delete bookmarks.
 */
@Injectable({
  providedIn: 'root',
})
export class BookmarkStorageService {
  constructor() {}

  /**
   * Retrieves all bookmarks from localStorage, sorted by creation date (newest first).
   *
   * @returns Array of bookmarks, or an empty array if none exist or parsing fails.
   */
  getAll(): Bookmark[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    try {
      const bookmarks = JSON.parse(raw) as Bookmark[];
      return this.sortByCreatedAtDesc(bookmarks);
    } catch {
      console.warn('Failed to parse bookmarks from localStorage');
      return [];
    }
  }

  /**
   * Sorts bookmarks in descending order based on `createdAt` timestamp.
   *
   * @param bookmarks List of bookmarks to sort
   * @returns Sorted bookmark list
   */
  private sortByCreatedAtDesc(bookmarks: Bookmark[]): Bookmark[] {
    return [...bookmarks].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  /**
   * Saves the provided bookmark list to localStorage.
   *
   * @param bookmarks List of bookmarks to persist
   */
  saveAll(bookmarks: Bookmark[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
  }

  /**
   * Adds a new bookmark to localStorage.
   *
   * @param bookmark The new bookmark to add
   */
  add(bookmark: Bookmark): void {
    const bookmarks = this.getAll();
    this.saveAll([...bookmarks, bookmark]);
  }

  /**
   * Updates an existing bookmark in localStorage.
   *
   * @param updated Bookmark with updated data
   */
  update(updated: Bookmark): void {
    const bookmarks = this.getAll();
    const newList = bookmarks.map(b => (b.id === updated.id ? updated : b));
    this.saveAll(newList);
  }

  /**
   * Deletes a bookmark by ID from localStorage.
   *
   * @param id ID of the bookmark to remove
   */
  delete(id: string): void {
    const bookmarks = this.getAll();
    const newList = bookmarks.filter(b => b.id !== id);
    this.saveAll(newList);
  }

  /**
   * Finds and returns a bookmark by ID.
   *
   * @param id ID of the bookmark to retrieve
   * @returns The matching bookmark or undefined if not found
   */
  getById(id: string): Bookmark | undefined {
    return this.getAll().find(b => b.id === id);
  }
}
