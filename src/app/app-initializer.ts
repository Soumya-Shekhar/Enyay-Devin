import { inject } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { AppConsts } from './core/constants/app-consts';
import { AppSessionService } from './core/services/app-session.service';
import { environment } from '../environments/environment';

export function initializeApp() {
  return () => {
    const platformLocation = inject(PlatformLocation);
    const http = inject(HttpClient);
    const appSessionService = inject(AppSessionService);

    return (async () => {
      try {
        AppConsts.appBaseHref = platformLocation.getBaseHrefFromDOM() || '/';

        // Step 1: Load runtime config from appconfig.json
        await loadAppConfig(http, platformLocation);

        // Step 2: Fetch session info if user has token
        await appSessionService.init();

        return true;
      } catch (err) {
        console.error('App initialization failed:', err);
        return false;
      }
    })();
  };
}

async function loadAppConfig(http: HttpClient, platformLocation: PlatformLocation): Promise<void> {
  const baseHref = platformLocation.getBaseHrefFromDOM() || '/';
  const origin = document.location.origin || `${document.location.protocol}//${document.location.hostname}${document.location.port ? ':' + document.location.port : ''}`;
  const appBaseUrl = origin + baseHref;
  const configUrl = `${appBaseUrl}assets/appconfig${environment.production ? '.production' : ''}.json`;

  try {
    const config = await firstValueFrom(http.get<any>(configUrl));
    AppConsts.remoteServiceBaseUrl = config.remoteServiceBaseUrl;
    AppConsts.appBaseUrl = config.appBaseUrl;
  } catch {
    AppConsts.remoteServiceBaseUrl = environment.remoteServiceBaseUrl;
    AppConsts.appBaseUrl = origin;
  }
}
