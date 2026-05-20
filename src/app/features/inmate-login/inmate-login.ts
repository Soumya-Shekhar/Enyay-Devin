import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-inmate-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './inmate-login.html',
  styleUrls: ['./inmate-login.scss'],
})
export class InmateLoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  prisonId = '';
  thumbScanned = false;
  faceScanned = false;

  dialAudioCall(): void {
    if (!this.prisonId) return;
    this.authService.setStaticAuth('inmate');
    this.router.navigate(['/inmate-welcome']);
  }

  scanThumbprint(): void {
    this.thumbScanned = true;
    this.authService.setStaticAuth('inmate');
    this.router.navigate(['/inmate-welcome']);
  }

  startVideoCall(): void {
    this.faceScanned = true;
    this.authService.setStaticAuth('inmate');
    this.router.navigate(['/inmate-welcome']);
  }
}
