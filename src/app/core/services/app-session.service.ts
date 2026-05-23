import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AppConsts } from '../constants/app-consts';
import { CookieService } from './cookie.service';
import { RoleService } from './role.service';

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
  private roleService = inject(RoleService);
  private userIdSignal = signal<number | null>(null);

  private userSignal = signal<UserLoginInfo | null>(null);
  private tenantSignal = signal<TenantLoginInfo | null>(null);
  private applicationSignal = signal<ApplicationInfo | null>(null);

  readonly user = this.userSignal.asReadonly();
  readonly userId = this.userIdSignal.asReadonly();
  readonly tenant = this.tenantSignal.asReadonly();
  readonly tenantId = computed(() => this.tenantSignal()?.id ?? null);
  readonly application = this.applicationSignal.asReadonly();

  getShownLoginName(): string {
    const user = this.userSignal();
    if (!user) return '';
    const tenantPrefix = this.tenantSignal()?.tenancyName ?? '.';
    return `${tenantPrefix}\\${user.userName}`;
  }

  setUserId(id: number): void {
    this.userIdSignal.set(id);
  }

  clearSession(): void {
    this.userIdSignal.set(null);
    this.roleService.clearRole();
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
          },
        ),
      );

      if (response && response.result) {
        this.userSignal.set(response.result.user || null);
        this.userIdSignal.set(response.result.user?.id ?? null);
        this.tenantSignal.set(response.result.tenant || null);
        this.applicationSignal.set(response.result.application || null);

        if (this.userId()) {
          await firstValueFrom(this.roleService.getCurrentRole(this.userId()));
        }
      }
      return true;
    } catch {
      return true;
    }
  }
}
