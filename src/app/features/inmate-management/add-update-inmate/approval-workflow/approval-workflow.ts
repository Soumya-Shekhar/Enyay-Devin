import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PRIME_NG_MODULES } from '../../../../shared/primeng/primeng-imports';
import { InmateDataService } from '../inmate-data.service';

@Component({
  selector: 'app-approval-workflow',
  standalone: true,
  imports: [CommonModule, FormsModule, ...PRIME_NG_MODULES],
  templateUrl: './approval-workflow.html',
  styleUrls: ['./approval-workflow.scss'],
})
export class ApprovalWorkflowComponent {
  constructor(public inmateService: InmateDataService) {}

  get approvalData() {
    return this.inmateService.approvalData;
  }

  approveLevel(level: number): void {
    const data = this.inmateService.approvalData();
    if (level === 1) {
      this.inmateService.approvalData.set({
        ...data,
        level1Status: 'Approved',
      });
    } else if (level === 2) {
      this.inmateService.approvalData.set({
        ...data,
        level2Status: 'Approved',
        finalStatus: 'Approved',
      });
    }
  }

  rejectLevel(level: number): void {
    const data = this.inmateService.approvalData();
    if (level === 1) {
      this.inmateService.approvalData.set({
        ...data,
        level1Status: 'Rejected',
      });
    } else if (level === 2) {
      this.inmateService.approvalData.set({
        ...data,
        level2Status: 'Rejected',
      });
    }
  }

  save(): void {
    this.inmateService.saveApprovalWorkflow();
  }
}
