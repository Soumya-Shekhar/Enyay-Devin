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
  selector: 'app-activate-calling',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...PRIME_NG_MODULES],
  templateUrl: './activate-calling.html',
  styleUrls: ['./activate-calling.scss'],
})
export class ActivateCallingComponent {
  private apiService = inject(InmateApiService);

  form = input.required<FormGroup>();
  inmateId = input.required<string>();
  saved = output<void>();

  private saveRequest = signal<SavePayload | undefined>(undefined);

  saveResource = rxResource({
    params: () => this.saveRequest(),
    stream: ({ params }) => {
      return this.apiService.saveCallingFeature(this.inmateId(), params.data);
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

  save(): void {
    this.saveRequest.set({ data: this.form().value, ts: Date.now() });
  }
}
