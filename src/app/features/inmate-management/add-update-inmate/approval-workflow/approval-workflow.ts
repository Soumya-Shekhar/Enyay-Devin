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
  selector: 'app-approval-workflow',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...PRIME_NG_MODULES],
  templateUrl: './approval-workflow.html',
  styleUrls: ['./approval-workflow.scss'],
})
export class ApprovalWorkflowComponent {
  private apiService = inject(InmateApiService);

  form = input.required<FormGroup>();
  inmateId = input.required<string>();
  saved = output<void>();

  private saveRequest = signal<SavePayload | undefined>(undefined);

  saveResource = rxResource({
    params: () => this.saveRequest(),
    stream: ({ params }) => {
      return this.apiService.saveApproval(this.inmateId(), params.data);
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

  approveLevel(level: number): void {
    if (level === 1) {
      this.form().patchValue({ level1Status: 'Approved' });
    } else if (level === 2) {
      this.form().patchValue({ level2Status: 'Approved', finalStatus: 'Approved' });
    }
  }

  rejectLevel(level: number): void {
    if (level === 1) {
      this.form().patchValue({ level1Status: 'Rejected' });
    } else if (level === 2) {
      this.form().patchValue({ level2Status: 'Rejected' });
    }
  }

  save(): void {
    this.saveRequest.set({ data: this.form().value, ts: Date.now() });
  }
}
