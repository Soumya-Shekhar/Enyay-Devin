import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AppConsts } from '../constants/app-consts';
import { CookieService } from './cookie.service';

export interface UserLoginInfo {
  id: number;
  name: string;
  surname: string;
  userName: string;
  emailAddress: string;
}

export interface TenantLoginInfo {
  id: number;
  tenancyName: string;
  name: string;
}

export interface ApplicationInfo {
  version: string;
  releaseDate: string;
  features: Record<string, boolean>;
}

@Injectable({ providedIn: 'root' })
export class AppSessionService {
  private http = inject(HttpClient);
  private cookieService = inject(CookieService);

  private userSignal = signal<UserLoginInfo | null>(null);
  private tenantSignal = signal<TenantLoginInfo | null>(null);
  private applicationSignal = signal<ApplicationInfo | null>(null);

  readonly user = this.userSignal.asReadonly();
  readonly userId = computed(() => this.userSignal()?.id ?? null);
  readonly tenant = this.tenantSignal.asReadonly();
  readonly tenantId = computed(() => this.tenantSignal()?.id ?? null);
  readonly application = this.applicationSignal.asReadonly();

  getShownLoginName(): string {
    const user = this.userSignal();
    if (!user) return '';
    const tenantPrefix = this.tenantSignal()?.tenancyName ?? '.';
    return `${tenantPrefix}\\${user.userName}`;
  }

  async init(): Promise<boolean> {
    const token = this.cookieService.get(AppConsts.authorization.authTokenName);
    if (!token) {
      return true;
    }

    try {
      const response = await firstValueFrom(
        this.http.get<any>(
          `${AppConsts.remoteServiceBaseUrl}/api/services/app/Session/GetCurrentLoginInformations`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
      );

      if (response && response.result) {
        this.userSignal.set(response.result.user || null);
        this.tenantSignal.set(response.result.tenant || null);
        this.applicationSignal.set(response.result.application || null);
      }
      return true;
    } catch {
      return true;
    }
  }
}
