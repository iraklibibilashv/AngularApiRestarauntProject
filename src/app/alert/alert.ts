import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AlertService } from '../services/alert';

@Component({
  selector: 'app-alert',
  imports: [CommonModule],
  templateUrl: './alert.html',
  styleUrl: './alert.scss',
})
export class Alert {
  constructor(public alertService: AlertService) {}
}
