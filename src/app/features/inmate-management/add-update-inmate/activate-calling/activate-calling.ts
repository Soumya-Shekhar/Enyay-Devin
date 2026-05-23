import { Component, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { PRIME_NG_MODULES } from '../../../../shared/primeng/primeng-imports';
import { InmateDataService } from '../inmate-data.service';

@Component({
  selector: 'app-activate-calling',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ...PRIME_NG_MODULES],
  templateUrl: './activate-calling.html',
  styleUrls: ['./activate-calling.scss'],
})
export class ActivateCallingComponent {
  save$ = output<void>();

  constructor(public inmateService: InmateDataService) {}

  get form() {
    return this.inmateService.callingFeatureForm;
  }

  save(): void {
    this.form.markAllAsTouched();
    console.log('Saving calling feature:', this.form.value);
    this.save$.emit();
  }
}
