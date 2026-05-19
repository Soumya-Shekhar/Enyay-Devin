import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User, LoginRequest, LoginResponse, AuthToken } from '../models';
import { CookieService } from './cookie.service';
import { AppConsts } from '../constants/app-consts';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);

  private currentUserSignal = signal<User | null>(null);
  private isAuthenticatedSignal = signal<boolean>(this.isLoggedIn());

  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = this.isAuthenticatedSignal.asReadonly();
  readonly isLoggedOut = computed(() => !this.isAuthenticatedSignal());

  login(username: string, password: string, rememberClient = true): Observable<boolean> {
    const body: LoginRequest = {
      userNameOrEmailAddress: username,
      password: password,
      rememberClient: rememberClient,
    };

    return this.http
      .post<LoginResponse>(
        `${AppConsts.remoteServiceBaseUrl}/api/TokenAuth/Authenticate`,
        body
      )
      .pipe(
        map((response) => {
          if (response && response.result && response.result.accessToken) {
            const tokenData: AuthToken = response.result;
            this.setToken(tokenData);
            this.isAuthenticatedSignal.set(true);
            return true;
          }
          return false;
        }),
        catchError(() => {
          return of(false);
        })
      );
  }

  getToken(): string | null {
    return this.cookieService.get(AppConsts.authorization.authTokenName);
  }

  setToken(token: AuthToken): void {
    const expireDays = token.expireInSeconds / (60 * 60 * 24);
    this.cookieService.set(AppConsts.authorization.authTokenName, token.accessToken, expireDays);
    this.cookieService.set(AppConsts.authorization.encryptedAuthTokenName, token.encryptedAccessToken, expireDays);
    this.isAuthenticatedSignal.set(true);
  }

  removeToken(): void {
    this.cookieService.delete(AppConsts.authorization.authTokenName);
    this.cookieService.delete(AppConsts.authorization.encryptedAuthTokenName);
    this.isAuthenticatedSignal.set(false);
    this.currentUserSignal.set(null);
  }

  setCurrentUser(user: User): void {
    this.currentUserSignal.set(user);
    this.isAuthenticatedSignal.set(true);
  }

  getCurrentUser(): User | null {
    return this.currentUserSignal();
  }

  isLoggedIn(): boolean {
    return !!this.cookieService?.get(AppConsts.authorization.authTokenName);
  }

  setStaticAuth(role: string): void {
    this.cookieService.set(AppConsts.authorization.authTokenName, `static-${role}-token`, 1);
    this.isAuthenticatedSignal.set(true);
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token?.startsWith('static-inmate-')) return 'inmate';
    return 'admin';
  }

  logout(): void {
    this.removeToken();
  }
}
