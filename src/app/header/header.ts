import { CommonModule } from '@angular/common';
import { Component, HostListener, Input,} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Api } from '../../services/api';

@Component({
  selector: 'app-header',
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  constructor(private api : Api){}
  @Input() cartCount : number = 0;
  isScrolled = false;
  menuOpen = false;

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

