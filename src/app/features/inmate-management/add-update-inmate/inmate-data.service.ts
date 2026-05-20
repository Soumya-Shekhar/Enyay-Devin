import { Injectable, signal } from '@angular/core';

export interface FamilyContact {
  fullName: string;
  sonDaughterOf: string;
  relation: string;
  contactNumber: string;
  aadharCard: File | null;
  simOwnerName: string;
  simAffidavit: File | null;
  eNyayAppId: string;
}

@Injectable({
  providedIn: 'root'
})
export class InmateDataService {
  // Step 1: Inmate Details
  inmateData = signal({
    fullName: '',
    sonDaughterOf: '',
    gender: 'Male',
    jailNo: '',
    prisonId: '',
    aadharCard: null as File | null,
    passportNo: '',
    drivingLicenseNo: '',
    thumbCaptured: false,
    faceCaptured: false,
  });

  // Step 2: Family Contact - Audio Call
  audioContactData = signal<FamilyContact>({
    fullName: '',
    sonDaughterOf: '',
    relation: '',
    contactNumber: '',
    aadharCard: null,
    simOwnerName: '',
    simAffidavit: null,
    eNyayAppId: '',
  });
  audioThumbCaptured = signal(false);
  audioFaceCaptured = signal(false);

  // Step 3: Family Contact - Video Call
  videoContactData = signal<FamilyContact>({
    fullName: '',
    sonDaughterOf: '',
    relation: '',
    contactNumber: '',
    aadharCard: null,
    simOwnerName: '',
    simAffidavit: null,
    eNyayAppId: '',
  });
  videoThumbCaptured = signal(false);
  videoFaceCaptured = signal(false);

  // Step 4: Approval Workflow
  approvalData = signal({
    level1Remarks: '',
    level2Remarks: '',
    level1Status: 'Pending',
    level2Status: 'Pending',
    finalStatus: 'Waiting for approvals',
  });

  // Step 5: Wallet & Recharge
  walletData = signal({
    currentBalance: 1250.0,
    rechargeAmount: null as number | null,
  });

  // Step 6: Activate Calling Feature
  callingFeatureData = signal({
    audioCalling: false,
    videoCalling: false,
  });

  // Step 7: Deactivate Calling Feature
  deactivationData = signal({
    reason: '',
    remarks: '',
  });

  // Save data for each section
  saveInmateDetails(): void {
    console.log('Saving inmate details:', this.inmateData());
  }

  saveAudioContact(): void {
    console.log('Saving audio contact:', this.audioContactData());
  }

  saveVideoContact(): void {
    console.log('Saving video contact:', this.videoContactData());
  }

  saveApprovalWorkflow(): void {
    console.log('Saving approval workflow:', this.approvalData());
  }

  saveWalletRecharge(): void {
    console.log('Saving wallet & recharge:', this.walletData());
  }

  saveCallingFeature(): void {
    console.log('Saving calling feature:', this.callingFeatureData());
  }

  saveDeactivation(): void {
    console.log('Saving deactivation:', this.deactivationData());
  }

  // Get all data
  getAllData() {
    return {
      inmate: this.inmateData(),
      audioContact: this.audioContactData(),
      videoContact: this.videoContactData(),
      approval: this.approvalData(),
      wallet: this.walletData(),
      callingFeature: this.callingFeatureData(),
      deactivation: this.deactivationData(),
    };
  }
}
