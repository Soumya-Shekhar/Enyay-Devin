import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PRIME_NG_MODULES } from '../../../../shared/primeng/primeng-imports';
import { InmateDataService } from '../inmate-data.service';

@Component({
  selector: 'app-deactivate-calling',
  standalone: true,
  imports: [CommonModule, FormsModule, ...PRIME_NG_MODULES],
  templateUrl: './deactivate-calling.html',
  styleUrls: ['./deactivate-calling.scss'],
})
export class DeactivateCallingComponent {
  deactivationReasons = [
    { label: 'Select reason', value: '' },
    { label: 'Court Order', value: 'Court Order' },
    { label: 'Misconduct', value: 'Misconduct' },
    { label: 'Security Concern', value: 'Security Concern' },
    { label: 'Administrative', value: 'Administrative' },
    { label: 'Other', value: 'Other' },
  ];

  constructor(public inmateService: InmateDataService) {}

  get deactivationData() {
    return this.inmateService.deactivationData;
  }

  save(): void {
    this.inmateService.saveDeactivation();
  }
}
