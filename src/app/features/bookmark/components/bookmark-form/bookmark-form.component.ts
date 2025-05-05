import { Component, EventEmitter, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Bookmark } from '../../bookmark.model';
import { Router } from '@angular/router';
import { validateUrlFormat, checkUrlAvailability } from '../../../../shared/validators/url.validators';

@Component({
  selector: 'app-bookmark-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './bookmark-form.component.html',
  styleUrls: ['./bookmark-form.component.css'],
})
export class BookmarkFormComponent {
  @Output() bookmarkAdded = new EventEmitter<Bookmark>();

  form: FormGroup;
  urlExists: boolean | null = null;
  isCheckingUrl = false;

  // Constructor initializes the form group with title and URL fields.
  // The FormBuilder service is used to create the form group and its controls.
  // The form is reactive, allowing for dynamic validation and state management.
  // The URL field uses a shared validator to check its format.
  // The router is injected to navigate to the result page after submission.
  constructor(private fb: FormBuilder, private router: Router)  {
    this.form = this.fb.group({
      title: ['', Validators.required],
      url: [
        '',
        [Validators.required, validateUrlFormat],
        [checkUrlAvailability()]
      ],
    });
  }

  /**
   * Submits a new bookmark if the form is valid and the URL is confirmed.
   * Emits the bookmark and resets the form and validation state.
   */
  onSubmit(): void {
    if (this.form.invalid || this.urlExists === false || this.isCheckingUrl) return;

    const { title, url } = this.form.value;

    const newBookmark: Bookmark = {
      id: crypto.randomUUID(),
      title,
      url,
      createdAt: new Date().toISOString(),
    };

    this.bookmarkAdded.emit(newBookmark);
    this.form.reset();
    this.urlExists = null;

    this.router.navigate(['/result'], {
      state: { bookmark: newBookmark },
    });
  }
}
