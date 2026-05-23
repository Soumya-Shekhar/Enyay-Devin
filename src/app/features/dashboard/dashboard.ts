import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { TabsModule } from 'primeng/tabs';
import { PRIME_NG_MODULES } from '../../shared/primeng/primeng-imports';
import { interval, Subscription } from 'rxjs';

interface OngoingCall {
  id: string;
  prisonId: string;
  prisonerName: string;
  callType: 'audio' | 'video';
  startTime: Date;
  connectedWith: {
    name: string;
    relation: string;
    contactNumber: string;
  };
}

interface EndedCall {
  id: string;
  prisonId: string;
  prisonerName: string;
  callType: 'audio' | 'video';
  startTime: Date;
  endTime: Date;
  connectedWith: {
    name: string;
    relation: string;
    contactNumber: string;
  };
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, DialogModule, TabsModule, ...PRIME_NG_MODULES],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  stats = [
    { label: 'Total Users', value: '1,234', icon: '👥' },
    { label: 'Active Sessions', value: '56', icon: '🔗' },
    { label: 'Revenue', value: '$12,345', icon: '💰' },
    { label: 'Growth', value: '+12.5%', icon: '📈' },
  ];

  ongoingCalls: OngoingCall[] = [];
  endedCalls: EndedCall[] = [];
  selectedOngoingCall: OngoingCall | null = null;
  selectedEndedCall: EndedCall | null = null;
  showOngoingModal = false;
  showEndedModal = false;
  elapsedTime = '00:00:00';

  private timerSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.loadCallsData();
  }

  ngOnDestroy(): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  loadCallsData(): void {
    // Mock data for ongoing calls
    this.ongoingCalls = [
      {
        id: 'CALL-001',
        prisonId: 'PID-78923',
        prisonerName: 'John Doe',
        callType: 'audio',
        startTime: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        connectedWith: {
          name: 'Mary Doe',
          relation: 'Wife',
          contactNumber: '9876543210',
        },
      },
      {
        id: 'CALL-002',
        prisonId: 'PID-78924',
        prisonerName: 'Robert Smith',
        callType: 'video',
        startTime: new Date(Date.now() - 12 * 60 * 1000), // 12 minutes ago
        connectedWith: {
          name: 'Sarah Smith',
          relation: 'Sister',
          contactNumber: '9876000111',
        },
      },
      {
        id: 'CALL-003',
        prisonId: 'PID-78925',
        prisonerName: 'James Wilson',
        callType: 'audio',
        startTime: new Date(Date.now() - 3 * 60 * 1000), // 3 minutes ago
        connectedWith: {
          name: 'Richard Wilson',
          relation: 'Father',
          contactNumber: '9876222333',
        },
      },
    ];

    // Mock data for already ended calls
    this.endedCalls = [
      {
        id: 'CALL-101',
        prisonId: 'PID-78926',
        prisonerName: 'Michael Johnson',
        callType: 'video',
        startTime: new Date(Date.now() - 45 * 60 * 1000),
        endTime: new Date(Date.now() - 30 * 60 * 1000),
        connectedWith: {
          name: 'Jennifer Johnson',
          relation: 'Wife',
          contactNumber: '9123456789',
        },
      },
      {
        id: 'CALL-102',
        prisonId: 'PID-78927',
        prisonerName: 'David Brown',
        callType: 'audio',
        startTime: new Date(Date.now() - 60 * 60 * 1000),
        endTime: new Date(Date.now() - 50 * 60 * 1000),
        connectedWith: {
          name: 'Lisa Brown',
          relation: 'Mother',
          contactNumber: '9234567890',
        },
      },
      {
        id: 'CALL-103',
        prisonId: 'PID-78928',
        prisonerName: 'Christopher Lee',
        callType: 'video',
        startTime: new Date(Date.now() - 90 * 60 * 1000),
        endTime: new Date(Date.now() - 75 * 60 * 1000),
        connectedWith: {
          name: 'Amanda Lee',
          relation: 'Sister',
          contactNumber: '9345678901',
        },
      },
    ];
  }

  viewOngoingCall(call: OngoingCall): void {
    this.selectedOngoingCall = call;
    this.showOngoingModal = true;
    this.startTimer(call.startTime);
  }

  viewEndedCall(call: EndedCall): void {
    this.selectedEndedCall = call;
    this.showEndedModal = true;
  }

  private startTimer(startTime: Date): void {
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.timerSubscription = interval(1000).subscribe(() => {
      const now = new Date();
      const elapsed = Math.floor((now.getTime() - startTime.getTime()) / 1000);
      this.elapsedTime = this.formatTime(elapsed);
    });
  }

  private formatTime(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${this.pad(hours)}:${this.pad(minutes)}:${this.pad(secs)}`;
  }

  private pad(num: number): string {
    return num.toString().padStart(2, '0');
  }

  getCallDuration(startTime: Date, endTime: Date): string {
    const duration = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
    return this.formatTime(duration);
  }

  closeOngoingModal(): void {
    this.showOngoingModal = false;
    this.selectedOngoingCall = null;
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
      this.timerSubscription = null;
    }
  }

  closeEndedModal(): void {
    this.showEndedModal = false;
    this.selectedEndedCall = null;
  }
}
