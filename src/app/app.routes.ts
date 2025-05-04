import { Routes } from '@angular/router';
import { BookmarkComponent } from './features/bookmark/bookmark.component';
import { BookmarkResultComponent } from './features/bookmark/components/bookmark-result/bookmark-result.component';

export const routes: Routes = [
  {
    path: '',
    component: BookmarkComponent,
  },
  {
    path: 'result',
    component: BookmarkResultComponent
  }
];
