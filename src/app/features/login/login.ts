import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
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

    if (!this.username || !this.password) {

      this.errorMessage =
        'Please enter both username and password.';

      return;
    }

    this.isLoading = true;

    this.authService
      .login(
        this.username,
        this.password,
        this.rememberClient
      )
      .pipe(

        switchMap((success) => {

          if (!success) {

            throw new Error(
              'Invalid username or password'
            );
          }

          return this.authService
            .getCurrentRole();

        })

      )
      .subscribe({

        next: (response) => {
          

          this.router.navigate([
            '/dashboard'
          ]);

          this.isLoading = false;
        },

        error: (error) => {

          console.error(error);

          this.errorMessage =
            error?.message ||
            'Login failed. Please try again.';

          this.isLoading = false;
        }

      });
  }
}