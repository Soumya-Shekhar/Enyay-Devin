import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup } from '@angular/forms';
import { PRIME_NG_MODULES } from '../../../../shared/primeng/primeng-imports';
import { InmateDataService } from '../inmate-data.service';

@Component({
  selector: 'app-audio-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, ...PRIME_NG_MODULES],
  templateUrl: './audio-contact.html',
  styleUrls: ['./audio-contact.scss'],
})
export class AudioContactComponent {
  save$ = output<void>();

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
  }

  removeContact(index: number): void {
    this.inmateService.removeAudioContact(index);
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

  save(): void {
    this.contacts.controls.forEach((ctrl) => (ctrl as FormGroup).markAllAsTouched());
    console.log('Saving audio contacts:', this.contacts.value, 'Selected:', this.selectedIndices());
    this.save$.emit();
  }
}
