import { Injectable, signal, inject, RendererFactory2, Renderer2 } from '@angular/core';
import { APP_CONSTANTS } from '../constants';

export type Theme = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private themeSignal = signal<Theme>(this.getSavedTheme());

  readonly theme = this.themeSignal.asReadonly();

  constructor() {
    const rendererFactory = inject(RendererFactory2);
    this.renderer = rendererFactory.createRenderer(null, null);
    this.applyTheme(this.themeSignal());
  }

  toggleTheme(): void {
    const newTheme: Theme = this.themeSignal() === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  setTheme(theme: Theme): void {
    this.themeSignal.set(theme);
    localStorage.setItem(APP_CONSTANTS.STORAGE_KEYS.THEME, theme);
    this.applyTheme(theme);
  }

  getCurrentTheme(): Theme {
    return this.themeSignal();
  }

  private getSavedTheme(): Theme {
    return (localStorage.getItem(APP_CONSTANTS.STORAGE_KEYS.THEME) as Theme) || 'light';
  }

  private applyTheme(theme: Theme): void {
    const body = document.body;
    this.renderer.removeClass(body, 'theme-light');
    this.renderer.removeClass(body, 'theme-dark');
    this.renderer.addClass(body, `theme-${theme}`);
  }
}
