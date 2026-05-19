import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.scss'],
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  username = '';
  password = '';
  rememberClient = true;
  errorMessage = '';
  isLoading = false;

  onSubmit(): void {
    this.errorMessage = '';
    this.isLoading = true;

    if (!this.username || !this.password) {
      this.errorMessage = 'Please enter both username and password.';
      this.isLoading = false;
      return;
    }

    this.authService.login(this.username, this.password, this.rememberClient).subscribe({
      next: (success) => {
        if (success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.errorMessage = 'Invalid username or password.';
        }
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Login failed. Please try again.';
        this.isLoading = false;
      },
    });
  }
}
