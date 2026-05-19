import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PRIME_NG_MODULES } from '../../../shared/primeng/primeng-imports';

interface RecentRequest {
  requestId: string;
  type: string;
  submittedOn: string;
  audioCallStatus: string;
  videoCallStatus: string;
  adminApproval: string;
  superintendentApproval: string;
  finalStatus: string;
}

@Component({
  selector: 'app-recent-requests',
  standalone: true,
  imports: [CommonModule, ...PRIME_NG_MODULES],
  templateUrl: './recent-requests.html',
  styleUrls: ['./recent-requests.scss'],
})
export class RecentRequestsComponent {
  recentRequests: RecentRequest[] = [
    {
      requestId: 'REQ12345',
      type: 'Activation',
      submittedOn: '18 May 2025 10:30 AM',
      audioCallStatus: 'Pending',
      videoCallStatus: 'Pending',
      adminApproval: 'Approved',
      superintendentApproval: 'Pending',
      finalStatus: 'Pending',
    },
    {
      requestId: 'REQ12344',
      type: 'Deactivation',
      submittedOn: '16 May 2025 03:15 PM',
      audioCallStatus: 'Disabled',
      videoCallStatus: 'Disabled',
      adminApproval: 'Approved',
      superintendentApproval: 'Approved',
      finalStatus: 'Deactivated',
    },
  ];

  getStatusSeverity(status: string): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Pending':
        return 'warn';
      case 'Disabled':
      case 'Deactivated':
      case 'Rejected':
        return 'danger';
      default:
        return 'info';
    }
  }
}
