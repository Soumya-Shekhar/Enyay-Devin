import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface InmateRecord {
  id: string;
  inmateDetails?: Record<string, unknown>;
  audioContact?: Record<string, unknown>;
  videoContact?: Record<string, unknown>;
  approval?: Record<string, unknown>;
  wallet?: Record<string, unknown>;
  callingFeature?: Record<string, unknown>;
  deactivation?: Record<string, unknown>;
}

@Injectable({ providedIn: 'root' })
export class InmateApiService {
  private store: Map<string, InmateRecord> = new Map();
  private currentId = '';

  constructor() {
    this.seedData();
  }

  private seedData(): void {
    const seeds: InmateRecord[] = [
      {
        id: 'INM-001',
        inmateDetails: {
          fullName: 'John Doe',
          sonDaughterOf: 'Richard Doe',
          gender: 'Male',
          jailNo: 'J-1001',
          prisonId: 'INM-001',
          passportNo: 'P12345',
          drivingLicenseNo: 'DL9876',
          thumbCaptured: true,
          faceCaptured: true,
        },
        audioContact: {
          fullName: 'Jane Doe',
          sonDaughterOf: 'Richard Doe',
          relation: 'Wife',
          contactNumber: '9876543210',
          simOwnerName: 'Jane Doe',
          eNyayAppId: 'EN-001',
        },
        videoContact: {
          fullName: 'Jane Doe',
          sonDaughterOf: 'Richard Doe',
          relation: 'Wife',
          contactNumber: '9876543210',
          simOwnerName: 'Jane Doe',
          eNyayAppId: 'EN-001',
        },
        approval: {
          level1Remarks: '',
          level2Remarks: '',
          level1Status: 'Approved',
          level2Status: 'Pending',
          finalStatus: 'Waiting for approvals',
        },
        wallet: { currentBalance: 1250, rechargeAmount: null },
        callingFeature: { audioCalling: true, videoCalling: false },
        deactivation: { reason: '', remarks: '' },
      },
      {
        id: 'INM-002',
        inmateDetails: {
          fullName: 'Jane Smith',
          sonDaughterOf: 'Robert Smith',
          gender: 'Female',
          jailNo: 'J-1002',
          prisonId: 'INM-002',
          passportNo: '',
          drivingLicenseNo: '',
          thumbCaptured: false,
          faceCaptured: false,
        },
      },
      {
        id: 'INM-003',
        inmateDetails: {
          fullName: 'Robert Brown',
          sonDaughterOf: 'James Brown',
          gender: 'Male',
          jailNo: 'J-1003',
          prisonId: 'INM-003',
          passportNo: '',
          drivingLicenseNo: 'DL5555',
          thumbCaptured: true,
          faceCaptured: false,
        },
      },
      {
        id: 'INM-004',
        inmateDetails: {
          fullName: 'Emily Davis',
          sonDaughterOf: 'Thomas Davis',
          gender: 'Female',
          jailNo: 'J-1004',
          prisonId: 'INM-004',
          passportNo: 'P99999',
          drivingLicenseNo: '',
          thumbCaptured: false,
          faceCaptured: false,
        },
      },
      {
        id: 'INM-005',
        inmateDetails: {
          fullName: 'Michael Wilson',
          sonDaughterOf: 'David Wilson',
          gender: 'Male',
          jailNo: 'J-1005',
          prisonId: 'INM-005',
          passportNo: '',
          drivingLicenseNo: 'DL1234',
          thumbCaptured: true,
          faceCaptured: true,
        },
      },
    ];

    for (const record of seeds) {
      this.store.set(record.id, record);
    }
  }

  setCurrentId(id: string): void {
    this.currentId = id;
  }

  getCurrentId(): string {
    return this.currentId;
  }

  getInmate(id: string): Observable<InmateRecord | null> {
    return of(this.store.get(id) ?? null).pipe(delay(300));
  }

  saveInmateDetails(
    id: string,
    data: Record<string, unknown>,
  ): Observable<{ success: boolean }> {
    const record = this.store.get(id) ?? { id };
    record.inmateDetails = data;
    this.store.set(id, record);
    return of({ success: true }).pipe(delay(400));
  }

  saveAudioContact(
    id: string,
    data: Record<string, unknown>,
  ): Observable<{ success: boolean }> {
    const record = this.store.get(id) ?? { id };
    record.audioContact = data;
    this.store.set(id, record);
    return of({ success: true }).pipe(delay(400));
  }

  saveVideoContact(
    id: string,
    data: Record<string, unknown>,
  ): Observable<{ success: boolean }> {
    const record = this.store.get(id) ?? { id };
    record.videoContact = data;
    this.store.set(id, record);
    return of({ success: true }).pipe(delay(400));
  }

  saveApproval(
    id: string,
    data: Record<string, unknown>,
  ): Observable<{ success: boolean }> {
    const record = this.store.get(id) ?? { id };
    record.approval = data;
    this.store.set(id, record);
    return of({ success: true }).pipe(delay(400));
  }

  saveWallet(
    id: string,
    data: Record<string, unknown>,
  ): Observable<{ success: boolean }> {
    const record = this.store.get(id) ?? { id };
    record.wallet = data;
    this.store.set(id, record);
    return of({ success: true }).pipe(delay(400));
  }

  saveCallingFeature(
    id: string,
    data: Record<string, unknown>,
  ): Observable<{ success: boolean }> {
    const record = this.store.get(id) ?? { id };
    record.callingFeature = data;
    this.store.set(id, record);
    return of({ success: true }).pipe(delay(400));
  }

  saveDeactivation(
    id: string,
    data: Record<string, unknown>,
  ): Observable<{ success: boolean }> {
    const record = this.store.get(id) ?? { id };
    record.deactivation = data;
    this.store.set(id, record);
    return of({ success: true }).pipe(delay(400));
  }

  getAllData(id: string): InmateRecord | undefined {
    return this.store.get(id);
  }
}
