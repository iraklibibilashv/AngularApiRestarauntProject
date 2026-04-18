import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Api } from '../services/api';
import { AlertService } from '../services/alert';

@Component({
  selector: 'app-verify-email',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './verify-email.html',
  styleUrl: './verify-email.scss',
})
export class VerifyEmail {
  email = '';
  code = '';
  isLoading = false;
  errorMsg = '';
  resendCooldown = 0;
  private timer: any;
 
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: Api,
    private alertService: AlertService
  ) {}
 
  ngOnInit(): void {
    this.email = this.route.snapshot.queryParamMap.get('email') || '';
  }
 
  ngOnDestroy(): void {
    clearInterval(this.timer);
  }
 
  onVerify() {
    this.isLoading = true;
    this.errorMsg = '';
    this.api.verifyEmail({ email: this.email, code: this.code }).subscribe({
      next: () => {
        this.alertService.success('Email verified! Please log in.');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMsg = err.error?.error?.detail || 'Invalid code. Try again.';
        this.isLoading = false;
      }
    });
  }
 
  onResend() {
    this.api.resendVerification(this.email).subscribe({
      next: () => {
        this.alertService.info('Code resent to your email.');
        this.startCooldown();
      },
      error: () => this.alertService.error('Could not resend. Try again.')
    });
  }
 
  private startCooldown() {
    this.resendCooldown = 60;
    this.timer = setInterval(() => {
      this.resendCooldown--;
      if (this.resendCooldown <= 0) clearInterval(this.timer);
    }, 1000);
  }
}
