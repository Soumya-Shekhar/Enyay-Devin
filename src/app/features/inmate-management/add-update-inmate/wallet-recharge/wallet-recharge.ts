import { Component, input, output, signal, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { rxResource } from '@angular/core/rxjs-interop';
import { PRIME_NG_MODULES } from '../../../../shared/primeng/primeng-imports';
import { InmateApiService } from '../inmate-api.service';

interface SavePayload {
  data: Record<string, unknown>;
  ts: number;
}

@Component({
  selector: 'app-wallet-recharge',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...PRIME_NG_MODULES],
  templateUrl: './wallet-recharge.html',
  styleUrls: ['./wallet-recharge.scss'],
})
export class WalletRechargeComponent {
  private apiService = inject(InmateApiService);

  form = input.required<FormGroup>();
  inmateId = input.required<string>();
  saved = output<void>();

  quickAmounts = [500, 1000, 2000, 5000];

  private saveRequest = signal<SavePayload | undefined>(undefined);

  saveResource = rxResource({
    params: () => this.saveRequest(),
    stream: ({ params }) => {
      return this.apiService.saveWallet(this.inmateId(), params.data);
    },
  });

  constructor() {
    effect(() => {
      const val = this.saveResource.value();
      if (val && typeof val === 'object' && 'success' in val) {
        this.saved.emit();
      }
    });
  }

  setQuickAmount(amount: number): void {
    this.form().patchValue({ rechargeAmount: amount });
  }

  addRecharge(): void {
    const balance = this.form().get('currentBalance')?.value ?? 0;
    const amount = this.form().get('rechargeAmount')?.value;
    if (amount && amount > 0) {
      this.form().patchValue({
        currentBalance: balance + amount,
        rechargeAmount: null,
      });
    }
  }

  save(): void {
    this.saveRequest.set({ data: this.form().value, ts: Date.now() });
  }
}
