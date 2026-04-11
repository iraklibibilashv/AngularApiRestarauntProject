import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  registerData = { firstName: '', lastName: '', email: '', password: '' };
showPassword = false;
isLoading = false;
errorMsg = '';

onRegister() { }
}
