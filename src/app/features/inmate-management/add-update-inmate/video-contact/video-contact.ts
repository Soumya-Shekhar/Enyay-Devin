import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PRIME_NG_MODULES } from '../../../../shared/primeng/primeng-imports';
import { InmateDataService } from '../inmate-data.service';

@Component({
  selector: 'app-video-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ...PRIME_NG_MODULES],
  templateUrl: './video-contact.html',
  styleUrls: ['./video-contact.scss'],
})
export class VideoContactComponent {
  relationOptions = [
    { label: 'Select relation', value: '' },
    { label: 'Father', value: 'Father' },
    { label: 'Mother', value: 'Mother' },
    { label: 'Brother', value: 'Brother' },
    { label: 'Sister', value: 'Sister' },
    { label: 'Wife', value: 'Wife' },
    { label: 'Husband', value: 'Husband' },
    { label: 'Son', value: 'Son' },
    { label: 'Daughter', value: 'Daughter' },
    { label: 'Friend', value: 'Friend' },
    { label: 'Other', value: 'Other' },
  ];

  constructor(public inmateService: InmateDataService) {}

  get videoContactData() {
    return this.inmateService.videoContactData;
  }

  get videoThumbCaptured() {
    return this.inmateService.videoThumbCaptured;
  }

  get videoFaceCaptured() {
    return this.inmateService.videoFaceCaptured;
  }

  captureThumb(): void {
    this.inmateService.videoThumbCaptured.set(true);
  }

  captureFace(): void {
    this.inmateService.videoFaceCaptured.set(true);
  }

  save(): void {
    this.inmateService.saveVideoContact();
  }
}
