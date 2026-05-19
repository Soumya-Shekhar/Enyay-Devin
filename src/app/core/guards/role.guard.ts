import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredRoles = route.data['roles'] as string[];

  const user = authService.getCurrentUser();

  if (!user) {
    return router.createUrlTree(['/login']);
  }

  const hasRole = requiredRoles.some((role) => user.roles.includes(role));
  if (hasRole) {
    return true;
  }

  return router.createUrlTree(['/unauthorized']);
};
