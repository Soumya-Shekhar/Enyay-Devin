import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AppConsts } from '../constants/app-consts';
import { CookieService } from '../services/cookie.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const cookieService = inject(CookieService);
  const token = authService.getToken();

  if (token) {
    const encToken = cookieService.get(AppConsts.authorization.encryptedAuthTokenName);

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
      ...(encToken ? { params: req.params.set('enc_auth_token', encToken) } : {}),
    });
  }

  return next(req);
};
