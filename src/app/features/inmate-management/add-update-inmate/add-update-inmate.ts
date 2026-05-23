import { Component, signal, computed, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { PRIME_NG_MODULES } from '../../../shared/primeng/primeng-imports';
import { InmateDetailsComponent } from './inmate-details/inmate-details';
import { AudioContactComponent } from './audio-contact/audio-contact';
import { VideoContactComponent } from './video-contact/video-contact';
import { ApprovalWorkflowComponent } from './approval-workflow/approval-workflow';
import { WalletRechargeComponent } from './wallet-recharge/wallet-recharge';
import { ActivateCallingComponent } from './activate-calling/activate-calling';
import { DeactivateCallingComponent } from './deactivate-calling/deactivate-calling';
import { InmateDataService } from './inmate-data.service';

interface MockInmateRecord {
  id: string;
  inmate?: Record<string, unknown>;
  audioContact?: Record<string, unknown>;
  videoContact?: Record<string, unknown>;
  approval?: Record<string, unknown>;
  wallet?: Record<string, unknown>;
  callingFeature?: Record<string, unknown>;
  deactivation?: Record<string, unknown>;
}

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
export class AddUpdateInmateComponent implements OnInit, OnDestroy {
  activeTab = signal('0');
  totalSteps = 7;
  inmateId = signal<string | null>(null);
  isEditMode = signal(false);

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

  private http = inject(HttpClient);
  private subscriptions = new Subscription();

  constructor(
    public inmateService: InmateDataService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.route.queryParams.subscribe((params) => {
        const id = params['id'];
        if (id) {
          this.inmateId.set(id);
          this.isEditMode.set(true);
          this.loadMockData(id);
        } else {
          this.inmateId.set(null);
          this.isEditMode.set(false);
          this.inmateService.resetAll();
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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
    const payload = this.inmateService.getAllData();
    console.log('Submitting all inmate data:', payload);
  }

  private loadMockData(id: string): void {
    this.subscriptions.add(
      this.http.get<MockInmateRecord[]>('assets/mock-data/inmates.json').subscribe((records) => {
        const record = records.find((r) => r.id === id);
        if (record) {
          this.inmateService.patchInmateData(record as unknown as Record<string, unknown>);
        }
      }),
    );
  }
}
