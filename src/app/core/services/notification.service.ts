import { Injectable, signal } from '@angular/core';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationsSignal = signal<Notification[]>([]);

  readonly notifications = this.notificationsSignal.asReadonly();

  showSuccess(message: string, duration = 3000): void {
    this.addNotification({ type: 'success', message, duration });
  }

  showError(message: string, duration = 5000): void {
    this.addNotification({ type: 'error', message, duration });
  }

  showWarning(message: string, duration = 4000): void {
    this.addNotification({ type: 'warning', message, duration });
  }

  showInfo(message: string, duration = 3000): void {
    this.addNotification({ type: 'info', message, duration });
  }

  dismiss(id: string): void {
    this.notificationsSignal.update((current) => current.filter((n) => n.id !== id));
  }

  private addNotification(notification: Omit<Notification, 'id'>): void {
    const id = this.generateId();
    const newNotification: Notification = { ...notification, id };
    this.notificationsSignal.update((current) => [...current, newNotification]);

    if (notification.duration) {
      setTimeout(() => this.dismiss(id), notification.duration);
    }
  }

  private generateId(): string {
    return `notif-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }
}
