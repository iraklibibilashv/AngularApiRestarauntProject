import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';
import { AlertService } from '../services/alert';

@Component({
  selector: 'app-home',
  imports: [FormsModule, RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  constructor(private api: Api,
    public alert : AlertService
  ) {}
  pillars = [
    {
      icon: '🌿',
      title: 'Fresh Ingredients',
      desc: 'Sourced daily from local farms',
    },
    {
      icon: '🔥',
      title: 'Wood-Fire Cooking',
      desc: 'Traditional Italian clay oven',
    },
    {
      icon: '🍷',
      title: 'Curated Wines',
      desc: 'Natural wines from Italy',
    },
  ];

  allProducts: any[] = [];
  topProducts: any[] = [];

  ngOnInit() {
    this.api.getAllProducts('products?Take=50&Page=1').subscribe({
      next: (data: any) => {
        this.allProducts = data.data.products;
        this.topProducts = this.allProducts.sort((a: any, b: any) => b.rate - a.rate).slice(0, 3);
      },
    });
  }
    addToCart(productId: number) {
    console.log('productId:', productId);
  this.api.addToCart(productId, 1).subscribe({
    
    next: () => this.alert.success('Product added to cart'),
    error: (err) => this.alert.error('Please log in first')
  });
}
}
