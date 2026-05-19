import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-dialog.html',
  styleUrls: ['./confirm-dialog.scss'],
})
export class ConfirmDialogComponent {
  @Input() title = 'Confirm';
  @Input() message = 'Are you sure?';
  @Input() confirmText = 'Confirm';
  @Input() cancelText = 'Cancel';
  @Input() isVisible = false;

  @Output() confirmed = new EventEmitter<void>();
  @Output() cancelled = new EventEmitter<void>();

  onConfirm(): void {
    this.confirmed.emit();
    this.isVisible = false;
  }

  onCancel(): void {
    this.cancelled.emit();
    this.isVisible = false;
  }
}
