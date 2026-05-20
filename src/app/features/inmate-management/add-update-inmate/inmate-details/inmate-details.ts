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
  selector: 'app-inmate-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...PRIME_NG_MODULES],
  templateUrl: './inmate-details.html',
  styleUrls: ['./inmate-details.scss'],
})
export class InmateDetailsComponent {
  private apiService = inject(InmateApiService);

  form = input.required<FormGroup>();
  inmateId = input.required<string>();
  saved = output<void>();

  genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Transgender', value: 'Transgender' },
  ];

  private saveRequest = signal<SavePayload | undefined>(undefined);

  saveResource = rxResource({
    params: () => this.saveRequest(),
    stream: ({ params }) => {
      return this.apiService.saveInmateDetails(this.inmateId(), params.data);
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

  captureThumb(): void {
    this.form().patchValue({ thumbCaptured: true });
  }

  captureFace(): void {
    this.form().patchValue({ faceCaptured: true });
  }

  save(): void {
    this.saveRequest.set({ data: this.form().value, ts: Date.now() });
  }
}
