import { Injectable, signal } from '@angular/core';

export type AlertType = 'success' | 'error' | 'warning' | 'info';

export interface Alert {
  id: number;
  type: AlertType;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class AlertService {
  alerts = signal<Alert[]>([]);
  private counter = 0;

  show(message: string, type: AlertType = 'success', duration = 3000) {
    const id = ++this.counter;
    this.alerts.update(arr => [...arr, { id, type, message }]);
    setTimeout(() => this.remove(id), duration);
  }

  success(message: string) { this.show(message, 'success'); }
  error(message: string)   { this.show(message, 'error'); }
  warning(message: string) { this.show(message, 'warning'); }
  info(message: string)    { this.show(message, 'info'); }

  remove(id: number) {
    this.alerts.update(arr => arr.filter(a => a.id !== id));
  }
}