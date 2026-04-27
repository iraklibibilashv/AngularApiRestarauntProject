import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../services/api';
import { AlertService } from '../services/alert';

@Component({
  selector: 'app-forgot-password',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.scss',
})
export class ForgotPassword {
  step = 1; // 1 = email form, 2 = reset form
 
  email = '';
  resetToken = '';
  newPassword = '';
  showPassword = false;
  isLoading = false;
  errorMsg = '';
 
  constructor(
    private api: Api,
    private router: Router,
    private alertService: AlertService
  ) {}
 
  onForgot() {
    this.isLoading = true;
    this.errorMsg = '';
    this.api.forgotPassword(this.email).subscribe({
      next: () => {
        this.alertService.info('Reset token sent to your email.');
        this.router.navigate(['/reset-password']);
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMsg = err.error?.error?.detail || 'Email not found.';
        this.isLoading = false;
      }
    });
  }
 
  onReset() {
    this.isLoading = true;
    this.errorMsg = '';
    this.api.resetPassword({ token: this.resetToken, newPassword: this.newPassword }).subscribe({
      next: () => {
        this.alertService.success('Password reset! Please log in.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMsg = err.error?.error?.detail || 'Invalid token. Try again.';
        this.isLoading = false;
      }
    });
  }
}
