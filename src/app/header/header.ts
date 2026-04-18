import { CommonModule } from '@angular/common';
import { Component, HostListener, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../services/api';
import { AlertService } from '../services/alert';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule,],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(private api: Api,
    private router : Router,
    public alert : AlertService
  ) {}
  @Input() cartCount: number = 0;
  isScrolled = false;
  menuOpen = false;
  isLoggedIn(): boolean {
  return !!localStorage.getItem('token');
}
logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  this.alert.success('Logout Succesfull')
  this.router.navigate(['/login']);
}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 40;
  }
  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    document.body.style.overflow = this.menuOpen ? `hidden` : '';
  }
  closeMenu() {
    this.menuOpen = false;
    document.body.style.overflow = '';
  }
}
