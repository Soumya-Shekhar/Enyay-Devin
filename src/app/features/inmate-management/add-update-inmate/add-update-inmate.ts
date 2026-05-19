import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PRIME_NG_MODULES } from '../../../shared/primeng/primeng-imports';

interface FamilyContact {
  fullName: string;
  sonDaughterOf: string;
  relation: string;
  contactNumber: string;
  aadharCard: File | null;
  simOwnerName: string;
  simAffidavit: File | null;
  eNyayAppId: string;
}

@Component({
  selector: 'app-add-update-inmate',
  standalone: true,
  imports: [CommonModule, FormsModule, ...PRIME_NG_MODULES],
  templateUrl: './add-update-inmate.html',
  styleUrls: ['./add-update-inmate.scss'],
})
export class AddUpdateInmateComponent {
  activeTab = signal('0');
  totalSteps = 7;

  currentStep = computed(() => parseInt(this.activeTab(), 10) + 1);
  isLastStep = computed(() => this.currentStep() === this.totalSteps);
  isFirstStep = computed(() => this.currentStep() === 1);

  steps = [
    { label: 'Inmate Details', icon: 'pi pi-user' },
    { label: 'Audio Contact', icon: 'pi pi-phone' },
    { label: 'Video Contact', icon: 'pi pi-video' },
    { label: 'Approval', icon: 'pi pi-check-circle' },
    { label: 'Wallet & Recharge', icon: 'pi pi-wallet' },
    { label: 'Activate Calling', icon: 'pi pi-bolt' },
    { label: 'Deactivate', icon: 'pi pi-ban' },
  ];

  // --- Step 1: Inmate Details ---
  inmate = {
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
  };

  genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Transgender', value: 'Transgender' },
  ];

  relationOptions = [
    { label: 'Select relation', value: '' },
    { label: 'Father', value: 'Father' },
    { label: 'Mother', value: 'Mother' },
    { label: 'Brother', value: 'Brother' },
    { label: 'Sister', value: 'Sister' },
    { label: 'Wife', value: 'Wife' },
    { label: 'Husband', value: 'Husband' },
    { label: 'Son', value: 'Son' },
    { label: 'Daughter', value: 'Daughter' },
    { label: 'Friend', value: 'Friend' },
    { label: 'Other', value: 'Other' },
  ];

  // --- Step 2: Family Contact - Audio Call ---
  audioContact: FamilyContact = {
    fullName: '',
    sonDaughterOf: '',
    relation: '',
    contactNumber: '',
    aadharCard: null,
    simOwnerName: '',
    simAffidavit: null,
    eNyayAppId: '',
  };
  audioThumbCaptured = false;
  audioFaceCaptured = false;

  // --- Step 3: Family Contact - Video Call ---
  videoContact: FamilyContact = {
    fullName: '',
    sonDaughterOf: '',
    relation: '',
    contactNumber: '',
    aadharCard: null,
    simOwnerName: '',
    simAffidavit: null,
    eNyayAppId: '',
  };
  videoThumbCaptured = false;
  videoFaceCaptured = false;

  // --- Step 4: Approval Workflow ---
  approval = {
    level1Remarks: '',
    level2Remarks: '',
    level1Status: 'Pending',
    level2Status: 'Pending',
    finalStatus: 'Waiting for approvals',
  };

  // --- Step 5: Wallet & Recharge ---
  wallet = {
    currentBalance: 1250.0,
    rechargeAmount: null as number | null,
  };
  quickAmounts = [500, 1000, 2000, 5000];

  // --- Step 6: Activate Calling Feature ---
  callingFeature = {
    audioCalling: false,
    videoCalling: false,
  };

  // --- Step 7: Deactivate Calling Feature ---
  deactivation = {
    reason: '',
    remarks: '',
  };
  deactivationReasons = [
    { label: 'Select reason', value: '' },
    { label: 'Court Order', value: 'Court Order' },
    { label: 'Misconduct', value: 'Misconduct' },
    { label: 'Security Concern', value: 'Security Concern' },
    { label: 'Administrative', value: 'Administrative' },
    { label: 'Other', value: 'Other' },
  ];

  // --- Navigation ---
  goToStep(step: number): void {
    this.activeTab.set((step - 1).toString());
  }

  nextStep(): void {
    if (!this.isLastStep()) {
      this.activeTab.set((this.currentStep()).toString());
    }
  }

  prevStep(): void {
    if (!this.isFirstStep()) {
      this.activeTab.set((this.currentStep() - 2).toString());
    }
  }

  // --- Methods ---
  captureThumb(section: string): void {
    if (section === 'inmate') this.inmate.thumbCaptured = true;
    else if (section === 'audio') this.audioThumbCaptured = true;
    else if (section === 'video') this.videoThumbCaptured = true;
  }

  captureFace(section: string): void {
    if (section === 'inmate') this.inmate.faceCaptured = true;
    else if (section === 'audio') this.audioFaceCaptured = true;
    else if (section === 'video') this.videoFaceCaptured = true;
  }

  validateSimOwner(section: string): void {
    const contact = section === 'audio' ? this.audioContact : this.videoContact;
    console.log('Validating SIM owner:', contact.simOwnerName);
  }

  approveLevel(level: number): void {
    if (level === 1) this.approval.level1Status = 'Approved';
    else if (level === 2) {
      this.approval.level2Status = 'Approved';
      this.approval.finalStatus = 'Approved';
    }
  }

  rejectLevel(level: number): void {
    if (level === 1) this.approval.level1Status = 'Rejected';
    else if (level === 2) this.approval.level2Status = 'Rejected';
  }

  setQuickAmount(amount: number): void {
    this.wallet.rechargeAmount = amount;
  }

  addRecharge(): void {
    if (this.wallet.rechargeAmount && this.wallet.rechargeAmount > 0) {
      this.wallet.currentBalance += this.wallet.rechargeAmount;
      this.wallet.rechargeAmount = null;
    }
  }

  submitAll(): void {
    const payload = {
      inmate: this.inmate,
      audioContact: this.audioContact,
      videoContact: this.videoContact,
      approval: this.approval,
      wallet: this.wallet,
      callingFeature: this.callingFeature,
      deactivation: this.deactivation,
    };
    console.log('Submitting all inmate data:', payload);
  }
}
