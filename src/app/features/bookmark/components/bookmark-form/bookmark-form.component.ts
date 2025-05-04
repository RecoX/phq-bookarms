import { Component, EventEmitter, Output } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      url: ['', [Validators.required, this.urlValidator]],
    });
  }

  urlValidator(control: any) {
    const value: string = control.value;
    try {
      const url = new URL(value);
      return url.protocol === 'http:' || url.protocol === 'https:' ? null : { invalidUrl: true };
    } catch {
      return { invalidUrl: true };
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const { title, url } = this.form.value;

    const newBookmark: Bookmark = {
      id: crypto.randomUUID(),
      title,
      url,
      createdAt: new Date().toISOString(),
    };

    this.bookmarkAdded.emit(newBookmark);
    this.form.reset();
  }
}
