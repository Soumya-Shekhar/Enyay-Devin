import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { PRIME_NG_MODULES } from '../../../../shared/primeng/primeng-imports';
import { InmateDataService } from '../inmate-data.service';

export type ApprovalStatus = 'pending' | 'approved' | 'rejected';

@Component({
  selector: 'app-audio-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ...PRIME_NG_MODULES],
  templateUrl: './audio-contact.html',
  styleUrls: ['./audio-contact.scss'],
})
export class AudioContactComponent {
  save$ = output<void>();
  contactStatuses = signal<ApprovalStatus[]>([]);

  relationOptions = [
    { label: 'Select relation', value: '' },
    { label: 'Father', value: 'Father' },
    { label: 'Mother', value: 'Mother' },
    { label: 'Brother', value: 'Brother' },
    { label: 'Sister', value: 'Sister' },
    { label: 'Wife', value: 'Wife' },
    { label: 'Husband', value: 'Husband' },
    { label: 'Son', value: 'Son' },
    { label: 'Daughter', value: 'Daughter' },
    { label: 'Friend', value: 'Friend' },
    { label: 'Other', value: 'Other' },
  ];

  constructor(public inmateService: InmateDataService) {}

  get contacts() {
    return this.inmateService.audioContacts;
  }

  get selectedIndices() {
    return this.inmateService.audioSelectedIndices;
  }

  getContactForm(index: number): FormGroup {
    return this.contacts.at(index) as FormGroup;
  }

  addContact(): void {
    this.inmateService.addAudioContact();
    this.contactStatuses.update((statuses) => [...statuses, 'pending']);
  }

  removeContact(index: number): void {
    this.inmateService.removeAudioContact(index);
    this.contactStatuses.update((statuses) => statuses.filter((_, i) => i !== index));
  }

  toggleSelection(index: number): void {
    this.inmateService.toggleAudioSelection(index);
  }

  isSelected(index: number): boolean {
    return this.selectedIndices().includes(index);
  }

  isSelectionDisabled(index: number): boolean {
    return !this.isSelected(index) && this.selectedIndices().length >= 2;
  }

  getContactLabel(index: number): string {
    const form = this.getContactForm(index);
    const name = form.get('fullName')?.value;
    return name ? `${name}` : `Contact ${index + 1}`;
  }

  getContactStatus(index: number): ApprovalStatus {
    return this.contactStatuses()[index] || 'pending';
  }

  approveContact(index: number): void {
    const form = this.getContactForm(index);
    form.markAllAsTouched();

    if (form.valid) {
      // Call API to save the contact
      console.log('Approving contact:', form.value);
      this.contactStatuses.update((statuses) => {
        const updated = [...statuses];
        updated[index] = 'approved';
        return updated;
      });
      // After API confirmation, the add contact button will be enabled
    } else {
      console.warn('Form is invalid, please fill all required fields');
    }
  }

  rejectContact(index: number): void {
    console.log('Rejecting contact:', this.getContactForm(index).value);
    this.contactStatuses.update((statuses) => {
      const updated = [...statuses];
      updated[index] = 'rejected';
      return updated;
    });
  }

  isAddContactDisabled(): boolean {
    // Disable if no contacts exist or if the last contact is still pending
    if (this.contacts.length === 0) return false;
    const lastIndex = this.contacts.length - 1;
    const lastStatus = this.getContactStatus(lastIndex);
    return lastStatus === 'pending';
  }

  getStatusSeverity(status: ApprovalStatus): 'success' | 'danger' | 'warn' {
    switch (status) {
      case 'approved':
        return 'success';
      case 'rejected':
        return 'danger';
      default:
        return 'warn';
    }
  }

  save(): void {
    this.contacts.controls.forEach((ctrl) => (ctrl as FormGroup).markAllAsTouched());
    console.log('Saving audio contacts:', this.contacts.value, 'Selected:', this.selectedIndices());
    this.save$.emit();
  }
}
