import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PRIME_NG_MODULES } from '../../../../shared/primeng/primeng-imports';
import { InmateDataService } from '../inmate-data.service';

@Component({
  selector: 'app-approval-workflow',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...PRIME_NG_MODULES],
  templateUrl: './approval-workflow.html',
  styleUrls: ['./approval-workflow.scss'],
})
export class ApprovalWorkflowComponent {
  save$ = output<void>();

  constructor(public inmateService: InmateDataService) {}

  get form() {
    return this.inmateService.approvalForm;
  }

  approveLevel(level: number): void {
    if (level === 1) {
      this.form.patchValue({ level1Status: 'Approved' });
    } else if (level === 2) {
      this.form.patchValue({ level2Status: 'Approved', finalStatus: 'Approved' });
    }
  }

  rejectLevel(level: number): void {
    if (level === 1) {
      this.form.patchValue({ level1Status: 'Rejected' });
    } else if (level === 2) {
      this.form.patchValue({ level2Status: 'Rejected' });
    }
  }

  save(): void {
    this.form.markAllAsTouched();
    console.log('Saving approval workflow:', this.form.value);
    this.save$.emit();
  }
}
