import { Component } from '@angular/core';
import { Api } from '../services/api';
import { Router, RouterModule } from '@angular/router';
import { AlertService } from '../services/alert';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  
  user: any = null;
  isLoading = false;
  isUpdating = false;
  activeTab = 'edit';
  showDeleteConfirm = false;
 
  showOld = false;
  showNew = false;
  showConfirm = false;
 
  editData = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    picture: '',
    address: '',
    age: 0
  };
 
  passData = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  };
 
  constructor(
    private api: Api,
    private router: Router,
    private alertService: AlertService
  ) {}
 
  ngOnInit(): void {
    this.loadProfile();
  }
 
  loadProfile() {
    this.isLoading = true;
    this.api.getAllProducts('users/me').subscribe({
      next: (res: any) => {
        this.user = res.data ?? res;
        this.editData = {
          firstName:   this.user.firstName   || '',
          lastName:    this.user.lastName    || '',
          phoneNumber: this.user.phoneNumber || '',
          picture:     this.user.picture     || '',
          address:     this.user.address     || '',
          age:         this.user.age         || 0
        };
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
 
  onEdit() {
    this.isUpdating = true;
    this.api.editProfile(this.editData).subscribe({
      next: () => {
        this.alertService.success('Profile updated successfully!');
        this.loadProfile();
        this.isUpdating = false;
      },
      error: (err) => {
        this.alertService.error(err.error?.error?.detail || 'Update failed.');
        this.isUpdating = false;
      }
    });
  }
 
  onChangePassword() {
    if (this.passData.newPassword !== this.passData.confirmPassword) {
      this.alertService.error('Passwords do not match!');
      return;
    }
    this.isUpdating = true;
    this.api.changePassword(this.passData).subscribe({
      next: () => {
        this.alertService.success('Password changed successfully!');
        this.passData = { oldPassword: '', newPassword: '', confirmPassword: '' };
        this.isUpdating = false;
      },
      error: (err) => {
        this.alertService.error(err.error?.error?.detail || 'Could not change password.');
        this.isUpdating = false;
      }
    });
  }
 
  onDelete() {
    this.api.deleteAccount().subscribe({
      next: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        this.alertService.info('Account deleted.');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.alertService.error(err.error?.error?.detail || 'Could not delete account.');
        this.showDeleteConfirm = false;
      }
    });
  }
  onRefreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    this.alertService.error('No refresh token found.');
    return;
  }
  this.api.refreshToken(refreshToken).subscribe({
    next: (res: any) => {
      localStorage.setItem('token', res.data.accessToken);
      this.alertService.success('Session refreshed!');
    },
    error: () => this.alertService.error('Session expired. Please log in again.')
  });
}
}
