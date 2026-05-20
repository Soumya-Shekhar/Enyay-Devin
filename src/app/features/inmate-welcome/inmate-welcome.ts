import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inmate-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './inmate-welcome.html',
  styleUrls: ['./inmate-welcome.scss'],
})
export class InmateWelcomeComponent {
  private router = inject(Router);

  inmateName = 'Ramesh Kumar';
  mobileNumber = '+91 9876543210';
  webId = 'RameshKu_021';

  dialAudioCall(): void {
    console.log('Dialing audio call to', this.mobileNumber);
  }

  startVideoCall(): void {
    console.log('Starting video call with Web ID:', this.webId);
  }
}
