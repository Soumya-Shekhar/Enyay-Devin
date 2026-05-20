import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class InmateDataService {
  constructor(private fb: FormBuilder) {}

  createInmateDetailsForm(): FormGroup {
    return this.fb.group({
      fullName: ['', Validators.required],
      sonDaughterOf: ['', Validators.required],
      gender: ['Male', Validators.required],
      jailNo: ['', Validators.required],
      prisonId: ['', Validators.required],
      passportNo: [''],
      drivingLicenseNo: [''],
      thumbCaptured: [false],
      faceCaptured: [false],
    });
  }

  createAudioContactForm(): FormGroup {
    return this.fb.group({
      fullName: ['', Validators.required],
      sonDaughterOf: ['', Validators.required],
      relation: ['', Validators.required],
      contactNumber: ['', Validators.required],
      simOwnerName: ['', Validators.required],
      eNyayAppId: [''],
    });
  }

  createVideoContactForm(): FormGroup {
    return this.fb.group({
      fullName: ['', Validators.required],
      sonDaughterOf: ['', Validators.required],
      relation: ['', Validators.required],
      contactNumber: ['', Validators.required],
      simOwnerName: [''],
      eNyayAppId: ['', Validators.required],
    });
  }

  createApprovalForm(): FormGroup {
    return this.fb.group({
      level1Remarks: [''],
      level2Remarks: [''],
      level1Status: ['Pending'],
      level2Status: ['Pending'],
      finalStatus: ['Waiting for approvals'],
    });
  }

  createWalletForm(): FormGroup {
    return this.fb.group({
      currentBalance: [1250.0],
      rechargeAmount: [null as number | null],
    });
  }

  createCallingFeatureForm(): FormGroup {
    return this.fb.group({
      audioCalling: [false],
      videoCalling: [false],
    });
  }

  createDeactivationForm(): FormGroup {
    return this.fb.group({
      reason: ['', Validators.required],
      remarks: [''],
    });
  }
}
