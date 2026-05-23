import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PRIME_NG_MODULES } from '../../../../shared/primeng/primeng-imports';
import { InmateDataService } from '../inmate-data.service';

@Component({
  selector: 'app-deactivate-calling',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...PRIME_NG_MODULES],
  templateUrl: './deactivate-calling.html',
  styleUrls: ['./deactivate-calling.scss'],
})
export class DeactivateCallingComponent {
  save$ = output<void>();

  deactivationReasons = [
    { label: 'Select reason', value: '' },
    { label: 'Court Order', value: 'Court Order' },
    { label: 'Misconduct', value: 'Misconduct' },
    { label: 'Security Concern', value: 'Security Concern' },
    { label: 'Administrative', value: 'Administrative' },
    { label: 'Other', value: 'Other' },
  ];

  constructor(public inmateService: InmateDataService) {}

  get form() {
    return this.inmateService.deactivationForm;
  }

  save(): void {
    this.form.markAllAsTouched();
    console.log('Saving deactivation:', this.form.value);
    this.save$.emit();
  }
}
