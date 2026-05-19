import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  set(name: string, value: string, expireDays?: number, path = '/'): void {
    let expires = '';
    if (expireDays) {
      const date = new Date();
      date.setTime(date.getTime() + expireDays * 24 * 60 * 60 * 1000);
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=${path}`;
  }

  get(name: string): string | null {
    const nameEQ = `${name}=`;
    const cookies = document.cookie.split(';');
    for (const cookie of cookies) {
      const c = cookie.trim();
      if (c.indexOf(nameEQ) === 0) {
        return decodeURIComponent(c.substring(nameEQ.length));
      }
    }
    return null;
  }

  delete(name: string, path = '/'): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}`;
  }

  has(name: string): boolean {
    return this.get(name) !== null;
  }
}
