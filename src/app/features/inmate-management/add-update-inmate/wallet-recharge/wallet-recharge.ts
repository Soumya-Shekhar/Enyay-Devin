import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PRIME_NG_MODULES } from '../../../../shared/primeng/primeng-imports';
import { InmateDataService } from '../inmate-data.service';

@Component({
  selector: 'app-wallet-recharge',
  standalone: true,
  imports: [CommonModule, FormsModule, ...PRIME_NG_MODULES],
  templateUrl: './wallet-recharge.html',
  styleUrls: ['./wallet-recharge.scss'],
})
export class WalletRechargeComponent {
  quickAmounts = [500, 1000, 2000, 5000];

  constructor(public inmateService: InmateDataService) {}

  get walletData() {
    return this.inmateService.walletData;
  }

  setQuickAmount(amount: number): void {
    const data = this.inmateService.walletData();
    this.inmateService.walletData.set({
      ...data,
      rechargeAmount: amount,
    });
  }

  addRecharge(): void {
    const data = this.inmateService.walletData();
    if (data.rechargeAmount && data.rechargeAmount > 0) {
      this.inmateService.walletData.set({
        ...data,
        currentBalance: data.currentBalance + data.rechargeAmount,
        rechargeAmount: null,
      });
    }
  }

  save(): void {
    this.inmateService.saveWalletRecharge();
  }
}
