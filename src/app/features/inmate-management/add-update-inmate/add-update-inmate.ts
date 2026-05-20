import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PRIME_NG_MODULES } from '../../../shared/primeng/primeng-imports';
import { InmateDetailsComponent } from './inmate-details/inmate-details';
import { AudioContactComponent } from './audio-contact/audio-contact';
import { VideoContactComponent } from './video-contact/video-contact';
import { ApprovalWorkflowComponent } from './approval-workflow/approval-workflow';
import { WalletRechargeComponent } from './wallet-recharge/wallet-recharge';
import { ActivateCallingComponent } from './activate-calling/activate-calling';
import { DeactivateCallingComponent } from './deactivate-calling/deactivate-calling';
import { InmateDataService } from './inmate-data.service';
import { InmateApiService } from './inmate-api.service';

@Component({
  selector: 'app-add-update-inmate',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...PRIME_NG_MODULES,
    InmateDetailsComponent,
    AudioContactComponent,
    VideoContactComponent,
    ApprovalWorkflowComponent,
    WalletRechargeComponent,
    ActivateCallingComponent,
    DeactivateCallingComponent,
  ],
  templateUrl: './add-update-inmate.html',
  styleUrls: ['./add-update-inmate.scss'],
})
export class AddUpdateInmateComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private inmateService = inject(InmateDataService);
  private apiService = inject(InmateApiService);

  activeTab = signal('0');
  totalSteps = 7;
  inmateId = signal('');
  isEditMode = signal(false);

  inmateDetailsForm!: FormGroup;
  audioContactForm!: FormGroup;
  videoContactForm!: FormGroup;
  approvalForm!: FormGroup;
  walletForm!: FormGroup;
  callingFeatureForm!: FormGroup;
  deactivationForm!: FormGroup;

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

  ngOnInit(): void {
    this.inmateDetailsForm = this.inmateService.createInmateDetailsForm();
    this.audioContactForm = this.inmateService.createAudioContactForm();
    this.videoContactForm = this.inmateService.createVideoContactForm();
    this.approvalForm = this.inmateService.createApprovalForm();
    this.walletForm = this.inmateService.createWalletForm();
    this.callingFeatureForm = this.inmateService.createCallingFeatureForm();
    this.deactivationForm = this.inmateService.createDeactivationForm();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.inmateId.set(id);
      this.isEditMode.set(true);
      this.apiService.setCurrentId(id);
      this.loadInmateData(id);
    } else {
      const newId = 'INM-' + Date.now();
      this.inmateId.set(newId);
      this.apiService.setCurrentId(newId);
    }
  }

  private loadInmateData(id: string): void {
    this.apiService.getInmate(id).subscribe((record) => {
      if (!record) return;
      if (record.inmateDetails) {
        this.inmateDetailsForm.patchValue(record.inmateDetails);
      }
      if (record.audioContact) {
        this.audioContactForm.patchValue(record.audioContact);
      }
      if (record.videoContact) {
        this.videoContactForm.patchValue(record.videoContact);
      }
      if (record.approval) {
        this.approvalForm.patchValue(record.approval);
      }
      if (record.wallet) {
        this.walletForm.patchValue(record.wallet);
      }
      if (record.callingFeature) {
        this.callingFeatureForm.patchValue(record.callingFeature);
      }
      if (record.deactivation) {
        this.deactivationForm.patchValue(record.deactivation);
      }
    });
  }

  onSaved(): void {
    this.nextStep();
  }

  goToStep(step: number): void {
    this.activeTab.set((step - 1).toString());
  }

  nextStep(): void {
    if (!this.isLastStep()) {
      this.activeTab.set(this.currentStep().toString());
    }
  }

  prevStep(): void {
    if (!this.isFirstStep()) {
      this.activeTab.set((this.currentStep() - 2).toString());
    }
  }

  submitAll(): void {
    const payload = this.apiService.getAllData(this.inmateId());
    console.log('Submitting all inmate data:', payload);
  }
}
