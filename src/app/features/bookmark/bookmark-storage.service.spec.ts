import { TestBed } from '@angular/core/testing';
import { BookmarkStorageService } from './bookmark-storage.service';
import { Bookmark } from './bookmark.model';

describe('BookmarkStorageService', () => {
  let service: BookmarkStorageService;

  const sampleBookmark: Bookmark = {
    id: '1',
    title: 'Angular Docs',
    url: 'https://angular.dev',
    createdAt: new Date().toISOString(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookmarkStorageService);
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a bookmark', () => {
    service.add(sampleBookmark);
    const bookmarks = service.getAll();
    expect(bookmarks.length).toBe(1);
    expect(bookmarks[0].id).toBe(sampleBookmark.id);
  });

  it('should get all bookmarks', () => {
    service.add(sampleBookmark);
    const result = service.getAll();
    expect(Array.isArray(result)).toBeTrue();
    expect(result.length).toBe(1);
  });

  it('should update a bookmark', () => {
    service.add(sampleBookmark);
    const updated = { ...sampleBookmark, title: 'Updated Title' };
    service.update(updated);
    const result = service.getById(sampleBookmark.id);
    expect(result?.title).toBe('Updated Title');
  });

  it('should delete a bookmark', () => {
    service.add(sampleBookmark);
    service.delete(sampleBookmark.id);
    const result = service.getAll();
    expect(result.length).toBe(0);
  });

  it('should get a bookmark by ID', () => {
    service.add(sampleBookmark);
    const result = service.getById('1');
    expect(result).toBeDefined();
    expect(result?.title).toBe('Angular Docs');
  });
});
