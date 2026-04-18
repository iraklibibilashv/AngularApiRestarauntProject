import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../services/api';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  constructor(
    private api: Api,
    private router: Router,
  ) {}
  showPassword = false;
  isLoading = false;
  errorMsg = '';

  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };

  onRegister() {
    this.api.postRegister(this.user).subscribe({
      next: (data: any) => {
        console.log(data);
        this.router.navigate(['./verify-email']);
      },
      error: (err) => {
        console.error(err);
        this.errorMsg = err.error.message;
      },
    });
  }
}
