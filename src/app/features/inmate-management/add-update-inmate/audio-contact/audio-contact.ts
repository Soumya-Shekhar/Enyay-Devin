import { Component, input, output, signal, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { rxResource } from '@angular/core/rxjs-interop';
import { PRIME_NG_MODULES } from '../../../../shared/primeng/primeng-imports';
import { InmateApiService } from '../inmate-api.service';

interface SavePayload {
  data: Record<string, unknown>;
  ts: number;
}

@Component({
  selector: 'app-audio-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...PRIME_NG_MODULES],
  templateUrl: './audio-contact.html',
  styleUrls: ['./audio-contact.scss'],
})
export class AudioContactComponent {
  private apiService = inject(InmateApiService);

  form = input.required<FormGroup>();
  inmateId = input.required<string>();
  saved = output<void>();

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

  private saveRequest = signal<SavePayload | undefined>(undefined);

  saveResource = rxResource({
    params: () => this.saveRequest(),
    stream: ({ params }) => {
      return this.apiService.saveAudioContact(this.inmateId(), params.data);
    },
  });

  constructor() {
    effect(() => {
      const val = this.saveResource.value();
      if (val && typeof val === 'object' && 'success' in val) {
        this.saved.emit();
      }
    });
  }

  validateSimOwner(): void {
    console.log('Validating SIM owner:', this.form().get('simOwnerName')?.value);
  }

  save(): void {
    this.saveRequest.set({ data: this.form().value, ts: Date.now() });
  }
}
