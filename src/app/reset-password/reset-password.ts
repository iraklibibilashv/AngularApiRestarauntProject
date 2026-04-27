import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Api } from '../services/api';
import { AlertService } from '../services/alert';

@Component({
  selector: 'app-reset-password',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword {
  constructor(
    private api: Api,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute,
  ) {}
  
  resetData = {
    token: '',
    newPassword: ''
  };
 
  showPassword = false;
  isLoading = false;
  errorMsg = '';
  
  onReset() {
    this.isLoading = true;
    this.errorMsg = '';
    this.api.resetPassword(this.resetData).subscribe({
      next: () => {
        this.alertService.success('Password reset successfully! Please log in.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMsg = err.error?.error?.detail || 'Invalid token. Try again.';
        this.isLoading = false;
      }
    });
  }
}
