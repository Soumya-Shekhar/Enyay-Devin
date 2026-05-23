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
  uploadedApprovalFile: File | null = null;

  uploadedApprovalFileName = '';

  isApprovalFileUploaded = false;

  constructor(public inmateService: InmateDataService) {}

  get form() {
    return this.inmateService.approvalForm;
  }

  approveLevel(level: number): void {
    switch (level) {
      case 1:
        this.form.patchValue({ level1Status: 'Approved' });
        break;
      case 2:
        this.form.patchValue({ level2Status: 'Approved' });
        break;
      case 3:
        this.form.patchValue({ level3Status: 'Approved' });
        break;
    }
  }

  rejectLevel(level: number): void {
    switch (level) {
      case 1:
        this.form.patchValue({ level1Status: 'Rejected' });
        break;
      case 2:
        this.form.patchValue({ level2Status: 'Rejected' });
        break;
      case 3:
        this.form.patchValue({ level3Status: 'Rejected' });
        break;
    }
  }

  save(): void {
    this.form.markAllAsTouched();
    console.log('Saving approval workflow:', this.form.value);
    this.save$.emit();
  }

  onCommonFileUpload(event: any): void {
    const file = event.files?.[0];

    if (!file) {
      return;
    }

    this.uploadedApprovalFile = file;

    this.uploadedApprovalFileName = file.name;

    this.isApprovalFileUploaded = true;

    console.log('Uploaded common approval file:', file);
  }
}
