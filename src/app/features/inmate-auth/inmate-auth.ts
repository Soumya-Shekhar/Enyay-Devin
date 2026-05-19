import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PRIME_NG_MODULES } from '../../shared/primeng/primeng-imports';

@Component({
  selector: 'app-inmate-auth',
  standalone: true,
  imports: [CommonModule, FormsModule, ...PRIME_NG_MODULES],
  templateUrl: './inmate-auth.html',
  styleUrls: ['./inmate-auth.scss'],
})
export class InmateAuthComponent {
  prisonId = '';
  phoneNumber = '+91 9876543210';
  thumbScanned = signal(false);
  faceScanned = signal(false);

  dialAudioCall(): void {
    if (!this.prisonId) return;
    console.log('Dialing audio call for Prison ID:', this.prisonId);
  }

  scanThumbprint(): void {
    this.thumbScanned.set(true);
    console.log('Thumbprint scanned successfully');
  }

  startVideoCall(): void {
    this.faceScanned.set(true);
    console.log('Starting video call with face recognition');
  }
}
