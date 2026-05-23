import { Injectable, signal } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

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

export interface  UploadedDocument {
  type: string;
  number: string;
  fileName: string;
}

@Injectable({
  providedIn: 'root',
})
export class InmateDataService {
  private fb = new FormBuilder();

  // Step 1: Inmate Details
  inmateDetailsForm: FormGroup = this.fb.group({
    fullName: ['', Validators.required],
    sonDaughterOf: ['', Validators.required],
    gender: ['Male', Validators.required],
    jailNo: ['', Validators.required],
    prisonId: ['', Validators.required],
    aliasname: [''],
    thumbCaptured: [false],
    faceCaptured: [false],
  });

  // Step 2: Audio Contacts (multiple records)
  audioContacts: FormArray = this.fb.array([this.createAudioContact()]);
  audioSelectedIndices = signal<number[]>([]);

  // Step 3: Video Contacts (multiple records)
  videoContacts: FormArray = this.fb.array([this.createVideoContact()]);
  videoSelectedIndices = signal<number[]>([]);

  audioThumbCaptured = signal(false);
  audioFaceCaptured = signal(false);
  videoThumbCaptured = signal(false);
  videoFaceCaptured = signal(false);

uploadedDocuments: UploadedDocument[] = [];

  // Step 4: Approval Workflow
  approvalForm: FormGroup = this.fb.group({
    level1Remarks: [''],
    level2Remarks: [''],
    level1Status: ['Pending'],
    level2Status: ['Pending'],
    finalStatus: ['Waiting for approvals'],
  });

  // Step 5: Wallet & Recharge
  walletForm: FormGroup = this.fb.group({
    currentBalance: [1250.0],
    rechargeAmount: [null],
  });

  // Step 6: Activate Calling
  callingFeatureForm: FormGroup = this.fb.group({
    audioCalling: [false],
    videoCalling: [false],
  });

  // Step 7: Deactivate Calling
  deactivationForm: FormGroup = this.fb.group({
    reason: ['', Validators.required],
    remarks: [''],
  });

  createAudioContact(): FormGroup {
    return this.fb.group({
      fullName: ['', Validators.required],
      sonDaughterOf: ['', Validators.required],
      relation: ['', Validators.required],
      contactNumber: ['', Validators.required],
      simOwnerName: ['', Validators.required],
      eNyayAppId: [''],
      selected: [false],
    });
  }

  createVideoContact(): FormGroup {
    return this.fb.group({
      fullName: ['', Validators.required],
      sonDaughterOf: ['', Validators.required],
      relation: ['', Validators.required],
      contactNumber: ['', Validators.required],
      eNyayAppId: ['', Validators.required],
      simOwnerName: [''],
      selected: [false],
    });
  }

  addAudioContact(): void {
    this.audioContacts.push(this.createAudioContact());
  }

  removeAudioContact(index: number): void {
    if (this.audioContacts.length > 1) {
      this.audioContacts.removeAt(index);
      this.audioSelectedIndices.update((sel) => sel.filter((i) => i !== index).map((i) => (i > index ? i - 1 : i)));
    }
  }

  addVideoContact(): void {
    this.videoContacts.push(this.createVideoContact());
  }

  removeVideoContact(index: number): void {
    if (this.videoContacts.length > 1) {
      this.videoContacts.removeAt(index);
      this.videoSelectedIndices.update((sel) => sel.filter((i) => i !== index).map((i) => (i > index ? i - 1 : i)));
    }
  }

  toggleAudioSelection(index: number): void {
    this.audioSelectedIndices.update((sel) => {
      if (sel.includes(index)) {
        return sel.filter((i) => i !== index);
      }
      if (sel.length >= 2) return sel;
      return [...sel, index];
    });
  }

  toggleVideoSelection(index: number): void {
    this.videoSelectedIndices.update((sel) => {
      if (sel.includes(index)) {
        return sel.filter((i) => i !== index);
      }
      if (sel.length >= 2) return sel;
      return [...sel, index];
    });
  }

  getFormByStep(step: number): FormGroup | FormArray {
    const forms: Record<number, FormGroup | FormArray> = {
      0: this.inmateDetailsForm,
      1: this.audioContacts,
      2: this.videoContacts,
      3: this.approvalForm,
      4: this.walletForm,
      5: this.callingFeatureForm,
      6: this.deactivationForm,
    };
    return forms[step];
  }

  getAllData(): Record<string, unknown> {
    return {
      inmate: this.inmateDetailsForm.value,
      audioContacts: this.audioContacts.value,
      audioSelected: this.audioSelectedIndices(),
      videoContacts: this.videoContacts.value,
      videoSelected: this.videoSelectedIndices(),
      approval: this.approvalForm.value,
      wallet: this.walletForm.value,
      callingFeature: this.callingFeatureForm.value,
      deactivation: this.deactivationForm.value,
    };
  }

  resetAll(): void {
    this.inmateDetailsForm.reset({ gender: 'Male', thumbCaptured: false, faceCaptured: false });
    this.uploadedDocuments = [];  
    this.audioContacts.clear();
    this.audioContacts.push(this.createAudioContact());
    this.audioSelectedIndices.set([]);
    this.videoContacts.clear();
    this.videoContacts.push(this.createVideoContact());
    this.videoSelectedIndices.set([]);
    this.approvalForm.reset({ level1Status: 'Pending', level2Status: 'Pending', finalStatus: 'Waiting for approvals' });
    this.walletForm.reset({ currentBalance: 1250.0 });
    this.callingFeatureForm.reset({ audioCalling: false, videoCalling: false });
    this.deactivationForm.reset();
    this.audioThumbCaptured.set(false);
    this.audioFaceCaptured.set(false);
    this.videoThumbCaptured.set(false);
    this.videoFaceCaptured.set(false);
  }

  patchInmateData(data: Record<string, unknown>): void {
if (data['inmate']) {

  const inmate =
    data['inmate'] as Record<string, unknown>;

  this.inmateDetailsForm.patchValue(inmate);

  this.uploadedDocuments =
    (inmate['documents'] as UploadedDocument[]) || [];
}
    if (data['audioContacts'] && Array.isArray(data['audioContacts'])) {
      this.audioContacts.clear();
      for (const contact of data['audioContacts'] as Record<string, unknown>[]) {
        const fg = this.createAudioContact();
        fg.patchValue(contact);
        this.audioContacts.push(fg);
      }
    } else if (data['audioContact']) {
      this.audioContacts.clear();
      const fg = this.createAudioContact();
      fg.patchValue(data['audioContact'] as Record<string, unknown>);
      this.audioContacts.push(fg);
    }

    if (data['videoContacts'] && Array.isArray(data['videoContacts'])) {
      this.videoContacts.clear();
      for (const contact of data['videoContacts'] as Record<string, unknown>[]) {
        const fg = this.createVideoContact();
        fg.patchValue(contact);
        this.videoContacts.push(fg);
      }
    } else if (data['videoContact']) {
      this.videoContacts.clear();
      const fg = this.createVideoContact();
      fg.patchValue(data['videoContact'] as Record<string, unknown>);
      this.videoContacts.push(fg);
    }

    if (data['approval']) this.approvalForm.patchValue(data['approval'] as Record<string, unknown>);
    if (data['wallet']) this.walletForm.patchValue(data['wallet'] as Record<string, unknown>);
    if (data['callingFeature']) this.callingFeatureForm.patchValue(data['callingFeature'] as Record<string, unknown>);
    if (data['deactivation']) this.deactivationForm.patchValue(data['deactivation'] as Record<string, unknown>);
  }
}
