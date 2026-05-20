import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PRIME_NG_MODULES } from '../../../../shared/primeng/primeng-imports';
import { InmateDataService } from '../inmate-data.service';

@Component({
  selector: 'app-activate-calling',
  standalone: true,
  imports: [CommonModule, FormsModule, ...PRIME_NG_MODULES],
  templateUrl: './activate-calling.html',
  styleUrls: ['./activate-calling.scss'],
})
export class ActivateCallingComponent {
  constructor(public inmateService: InmateDataService) {}

  get callingFeatureData() {
    return this.inmateService.callingFeatureData;
  }

  save(): void {
    this.inmateService.saveCallingFeature();
  }
}
