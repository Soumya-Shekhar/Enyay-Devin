import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PRIME_NG_MODULES } from '../../../../shared/primeng/primeng-imports';
import { InmateDataService } from '../inmate-data.service';

@Component({
  selector: 'app-audio-contact',
  standalone: true,
  imports: [CommonModule, FormsModule, ...PRIME_NG_MODULES],
  templateUrl: './audio-contact.html',
  styleUrls: ['./audio-contact.scss'],
})
export class AudioContactComponent {
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

  get audioContactData() {
    return this.inmateService.audioContactData;
  }

  get audioThumbCaptured() {
    return this.inmateService.audioThumbCaptured;
  }

  get audioFaceCaptured() {
    return this.inmateService.audioFaceCaptured;
  }

  captureThumb(): void {
    this.inmateService.audioThumbCaptured.set(true);
  }

  captureFace(): void {
    this.inmateService.audioFaceCaptured.set(true);
  }

  validateSimOwner(): void {
    const contact = this.inmateService.audioContactData();
    console.log('Validating SIM owner:', contact.simOwnerName);
  }

  save(): void {
    this.inmateService.saveAudioContact();
  }
}
