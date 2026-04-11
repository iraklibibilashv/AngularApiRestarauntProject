import { CommonModule, DecimalPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,DecimalPipe,RouterModule,FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  cartItems: any[] = [];
subtotal: number = 0;
tax: number = 0;
total: number = 0;
increase(item: any) { }
decrease(item: any) { }
removeItem(item: any) { }
clearCart() { }
checkout() { }


}
