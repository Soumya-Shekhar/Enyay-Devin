import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PRIME_NG_MODULES } from '../../../shared/primeng/primeng-imports';
import { InmateDetailsComponent } from './inmate-details/inmate-details';
import { AudioContactComponent } from './audio-contact/audio-contact';
import { VideoContactComponent } from './video-contact/video-contact';
import { ApprovalWorkflowComponent } from './approval-workflow/approval-workflow';
import { WalletRechargeComponent } from './wallet-recharge/wallet-recharge';
import { ActivateCallingComponent } from './activate-calling/activate-calling';
import { DeactivateCallingComponent } from './deactivate-calling/deactivate-calling';
import { InmateDataService } from './inmate-data.service';

@Component({
  selector: 'app-add-update-inmate',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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

  constructor(public inmateService: InmateDataService) {}

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

  submitAll(): void {
    const payload = this.inmateService.getAllData();
    console.log('Submitting all inmate data:', payload);
  }
}
