import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../services/api';
import { AlertService } from '../services/alert';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  constructor(
    private api: Api,
    private router: Router,
    public alert : AlertService
  ) {}
  showPassword = false;
  isLoading = false;
  errorMsg = '';

  user = {
    email: 'stepacc210@gmail.com',
    password: 'Stepacc210@gmail.com',
  };
  onLogin() {
    this.api.postLogin(this.user).subscribe({
      next: (data: any) => {
        localStorage.setItem('token', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        this.alert.success('Login Succesfull')
        console.log(data);
        this.router.navigate(['./home']);
      },
      error: (err) => {
        console.error(err);
        this.alert.error('Login Failed')
        this.errorMsg = err.error.message;
      },
    });
  }
}
