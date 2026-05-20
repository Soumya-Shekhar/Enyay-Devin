import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PRIME_NG_MODULES } from '../../../../shared/primeng/primeng-imports';
import { InmateDataService } from '../inmate-data.service';

@Component({
  selector: 'app-inmate-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ...PRIME_NG_MODULES],
  templateUrl: './inmate-details.html',
  styleUrls: ['./inmate-details.scss'],
})
export class InmateDetailsComponent {
  genderOptions = [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Transgender', value: 'Transgender' },
  ];

  constructor(public inmateService: InmateDataService) {}

  get inmateData() {
    return this.inmateService.inmateData;
  }

  captureThumb(): void {
    const data = this.inmateService.inmateData();
    this.inmateService.inmateData.set({
      ...data,
      thumbCaptured: true,
    });
  }

  captureFace(): void {
    const data = this.inmateService.inmateData();
    this.inmateService.inmateData.set({
      ...data,
      faceCaptured: true,
    });
  }

  save(): void {
    this.inmateService.saveInmateDetails();
  }
}
