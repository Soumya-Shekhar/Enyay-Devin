import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PRIME_NG_MODULES } from '../../../../shared/primeng/primeng-imports';
import { InmateDataService } from '../inmate-data.service';

@Component({
  selector: 'app-wallet-recharge',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...PRIME_NG_MODULES],
  templateUrl: './wallet-recharge.html',
  styleUrls: ['./wallet-recharge.scss'],
})
export class WalletRechargeComponent {
  save$ = output<void>();
  quickAmounts = [150, 300, 500, 1000, 2000, 5000];

  constructor(public inmateService: InmateDataService) {}

  get form() {
    return this.inmateService.walletForm;
  }

  setQuickAmount(amount: number): void {
    this.form.patchValue({ rechargeAmount: amount });
  }

  addRecharge(): void {
    const current = this.form.get('currentBalance')?.value || 0;
    const recharge = this.form.get('rechargeAmount')?.value;
    if (recharge && recharge > 0) {
      this.form.patchValue({
        currentBalance: current + recharge,
        rechargeAmount: null,
      });
    }
  }

  save(): void {
    this.form.markAllAsTouched();
    console.log('Saving wallet & recharge:', this.form.value);
    this.save$.emit();
  }
}
