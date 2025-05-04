import { Component, EventEmitter, Output } from '@angular/core';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Bookmark } from '../../bookmark.model';

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

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      url: ['', [Validators.required, this.validateUrlFormat]],
    });
  }

  /**
   * Synchronous validator that checks whether the input is a valid HTTP(S) URL
   * and includes a top-level domain (e.g. '.com', '.org').
   *
   * @param control The form control containing the URL string
   * @returns Null if valid, or a validation error object
   */
  validateUrlFormat(control: AbstractControl): ValidationErrors | null {
    const value = control.value?.trim();
    if (!value) return null;

    try {
      const url = new URL(value);
      // Ensure the protocol is either http or https
      const hasHttpProtocol = url.protocol === 'http:' || url.protocol === 'https:';

      // Extract the top-level domain (TLD) from the hostname
      const tld = url.hostname.split('.').pop() ?? '';

      // Validate the TLD: must be alphabetic and at least 2 characters long
      const hasValidTld = /^[a-z]{2,}$/i.test(tld);

      return hasHttpProtocol && hasValidTld ? null : { invalidUrl: true };
    } catch {
      return { invalidUrl: true };
    }
  }

  /**
   * Sends a HEAD request to check if the given URL is reachable.
   * Note: Uses no-cors mode, so errors may be false negatives.
   *
   * @param url The URL string to check
   * @returns Promise resolving to true (reachable) or false (error)
   */
  private checkUrlExists(url: string): Promise<boolean> {
    return fetch(url, { method: 'HEAD', mode: 'no-cors' })
      .then(() => true)
      .catch(() => false);
  }

  /**
   * Triggers format and reachability checks for the URL field.
   * Updates internal flags to control loading state and error messages.
   */
  validateUrlField(): void {
    const urlControl = this.form.get('url');
    if (!urlControl || urlControl.invalid) {
      this.urlExists = null;
      return;
    }

    const url = urlControl.value;
    this.isCheckingUrl = true;

    this.checkUrlExists(url)
      .then((exists) => {
        this.urlExists = exists;
      })
      .finally(() => {
        this.isCheckingUrl = false;
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
  }
}
