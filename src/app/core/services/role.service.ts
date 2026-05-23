import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AppConsts } from '../constants/app-consts';

@Injectable({ providedIn: 'root' })
export class RoleService {
  private http = inject(HttpClient);
  private currentRoleSignal = signal<string>('');

  readonly currentRole = this.currentRoleSignal.asReadonly();

  getCurrentRole(userId: number | null): Observable<string> {
    if (!userId) {
      this.currentRoleSignal.set('');
      return of('');
    }

    return this.http
      .get<any>(`${AppConsts.remoteServiceBaseUrl}/api/services/app/User/Get?Id=${userId}`)
      .pipe(
        map((response) => response?.result?.roleNames?.[0] || ''),
        tap((roleName) => {
          this.currentRoleSignal.set(roleName.toLowerCase());
        }),
        catchError(() => {
          this.currentRoleSignal.set('');
          return of('');
        }),
      );
  }

  clearRole(): void {
    this.currentRoleSignal.set('');
  }
}
