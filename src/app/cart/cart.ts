import { CommonModule, DecimalPipe } from '@angular/common';
import { ChangeDetectorRef, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Api } from '../services/api';
import { AlertService } from '../services/alert';

@Component({
  selector: 'app-cart',
  imports: [CommonModule,DecimalPipe,RouterModule,FormsModule],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {

  cartItems = signal<any[]>([]);
  isLoading = signal(false);

  subtotal = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );
  tax = computed(() => this.subtotal() * 0.1);
  total = computed(() => this.subtotal() + this.tax());

  constructor(private api: Api,
    private cdr : ChangeDetectorRef,
    public alert : AlertService
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.isLoading.set(true);
    this.api.getCart().subscribe({
      next: (res: any) => {
        this.cartItems.set(res.data.items);
        this.isLoading.set(false);
        this.cdr.detectChanges()
        
      },
      error: (err) => {
        console.error(err);
        this.isLoading.set(false);
      }
    });
  }

  increase(item: any) {
    this.api.editQuantity(item.id, item.quantity + 1).subscribe({
      next: () => this.loadCart()
    });
  }

  decrease(item: any) {
    if (item.quantity <= 1) {
      this.removeItem(item);
      return;
    }
    this.api.editQuantity(item.id, item.quantity - 1).subscribe({
      next: () => this.loadCart()
    });
  }

  removeItem(item: any) {
    this.api.removeFromCart(item.id).subscribe({
      next: () =>{ 
        this.alert.success('Product removed from cart')
        this.loadCart()
      },
      error: (err) => this.alert.error('Somethings Wrong')
    });
  }

  clearCart() {
    const removes = this.cartItems().map(item =>
      this.api.removeFromCart(item.id)
    );
    let done = 0;
    removes.forEach(req => req.subscribe({
      next: () => {
         done++; if (done === removes.length) this.loadCart();
         },
         error: (err) => this.alert.error('Somethings Wrong')
         
    }));
  }

  doCheckout() {
    this.api.checkout().subscribe({
      next: () => {
        this.alert.success('Checkout Succesfull')
        this.loadCart()
      },
      error: (err) => {
        this.alert.error('Somethings Wrong')
      }
    });
  }


}
