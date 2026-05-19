import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { NotificationService } from '../services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error) => {
      let errorMessage = 'An unexpected error occurred';

      switch (error.status) {
        case 401:
          errorMessage = 'Unauthorized. Please log in again.';
          router.navigate(['/login']);
          break;
        case 403:
          errorMessage = 'You do not have permission to perform this action.';
          break;
        case 404:
          errorMessage = 'The requested resource was not found.';
          break;
        case 500:
          errorMessage = 'An internal server error occurred.';
          break;
        default:
          if (error.error?.message) {
            errorMessage = error.error.message;
          }
          break;
      }

      notificationService.showError(errorMessage);
      return throwError(() => error);
    })
  );
};
