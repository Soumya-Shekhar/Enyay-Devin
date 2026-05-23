import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { PRIME_NG_MODULES } from '../../../shared/primeng/primeng-imports';

interface Inmate {
  fullName: string;
  sonDaughterOf: string;
  gender: string;
  jailNo: string;
  prisonId: string;
  aadharNo: string;
  passportNo: string;
  drivingLicenseNo: string;
  thumbCaptured: boolean;
  faceCaptured: boolean;
}

interface Contact {
  fullName: string;
  sonDaughterOf: string;
  relation: string;
  contactNumber: string;
  simOwnerName: string;
  eNyayAppId: string;
  selected: boolean;
  approvalStatus?: 'pending' | 'approved' | 'rejected';
}

interface InmateRecord {
  id: string;
  inmate: Inmate;
  audioContacts: Contact[];
  videoContacts: Contact[];
  documents?: any[];
  approval?: {
    level1Remarks: string;
    level2Remarks: string;
    level1Status: string;
    level2Status: string;
    finalStatus: string;
  };
}

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
  imports: [CommonModule, FormsModule, DialogModule, ...PRIME_NG_MODULES],
  templateUrl: './recent-requests.html',
  styleUrls: ['./recent-requests.scss'],
})
export class RecentRequestsComponent implements OnInit {
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

  selectedInmate: InmateRecord | null = null;
  inmateRecords: InmateRecord[] = [];
  showInmateDetail = false;
  uploadedFiles: File[] = [];
  remarksText = '';

  ngOnInit() {
    this.loadInmateData();
  }

  loadInmateData() {
    // This would typically come from an HTTP service
    this.inmateRecords = [
      {
        id: 'INM-001',
        inmate: {
          fullName: 'John Doe',
          sonDaughterOf: 'Richard Doe',
          gender: 'Male',
          jailNo: 'JL-2024-0451',
          prisonId: 'PID-78923',
          aadharNo: '4567 8901 2345',
          passportNo: 'K1234567',
          drivingLicenseNo: 'DL-0420201234567',
          thumbCaptured: true,
          faceCaptured: true,
        },
        audioContacts: [
          {
            fullName: 'Mary Doe',
            sonDaughterOf: 'James Wilson',
            relation: 'Wife',
            contactNumber: '9876543210',
            simOwnerName: 'Mary Doe',
            eNyayAppId: 'EN-AUD-00123',
            selected: true,
          },
          {
            fullName: 'Richard Doe',
            sonDaughterOf: 'George Doe',
            relation: 'Father',
            contactNumber: '9876000111',
            simOwnerName: 'Richard Doe',
            eNyayAppId: '',
            selected: true,
          },
          {
            fullName: 'Sarah Doe',
            sonDaughterOf: 'Richard Doe',
            relation: 'Sister',
            contactNumber: '9876222333',
            simOwnerName: 'Sarah Doe',
            eNyayAppId: '',
            selected: false,
          },
        ],
        videoContacts: [
          {
            fullName: 'Robert Doe',
            sonDaughterOf: 'Richard Doe',
            relation: 'Brother',
            contactNumber: '9123456789',
            eNyayAppId: 'EN-VID-00456',
            simOwnerName: 'Robert Doe',
            selected: true,
          },
          {
            fullName: 'Mary Doe',
            sonDaughterOf: 'James Wilson',
            relation: 'Wife',
            contactNumber: '9876543210',
            eNyayAppId: 'EN-VID-00457',
            simOwnerName: 'Mary Doe',
            selected: true,
          },
        ],
        documents: [
          {
            name: 'Aadhar_Card.pdf',
            size: '1024 KB',
            type: 'application/pdf',
            uploadedAt: '2025-05-15 09:30 AM',
          },
          {
            name: 'Prison_ID_Scan.jpg',
            size: '512 KB',
            type: 'image/jpeg',
            uploadedAt: '2025-05-15 09:35 AM',
          },
          {
            name: 'Request_Form.pdf',
            size: '256 KB',
            type: 'application/pdf',
            uploadedAt: '2025-05-16 10:00 AM',
          },
          {
            name: 'Medical_Report.pdf',
            size: '768 KB',
            type: 'application/pdf',
            uploadedAt: '2025-05-16 11:15 AM',
          },
        ],
        approval: {
          level1Remarks: 'Verified by Jail Admin. Documents are in order.',
          level2Remarks: 'Approved by Superintendent.',
          level1Status: 'Approved',
          level2Status: 'Approved',
          finalStatus: 'Approved',
        },
      },
    ];
  }

  viewInmateDetails(inmate: InmateRecord) {
    this.selectedInmate = inmate;
    this.showInmateDetail = true;
    this.uploadedFiles = [];
    this.remarksText = '';
  }

  closeInmateDetail() {
    this.showInmateDetail = false;
    this.selectedInmate = null;
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files) {
      this.uploadedFiles = Array.from(files);
    }
  }

  approveContact(contact: Contact) {
    contact.approvalStatus = 'approved';
    console.log('Approved contact:', contact.fullName);
  }

  rejectContact(contact: Contact) {
    contact.approvalStatus = 'rejected';
    console.log('Rejected contact:', contact.fullName);
  }

  approveRequest() {
    if (!this.selectedInmate) return;
    console.log('Approving inmate:', this.selectedInmate.id);
    console.log('Remarks:', this.remarksText);
    console.log('Uploaded files:', this.uploadedFiles);
    // Add your approval logic here
    alert(`Request approved for ${this.selectedInmate.inmate.fullName}`);
    this.closeInmateDetail();
  }

  getStatusSeverity(
    status: string,
  ): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
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
