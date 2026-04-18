import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Api } from '../services/api';
import { AlertService } from '../services/alert';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './details.html',
  styleUrl: './details.scss',
})
export class Details {
   product: any = null;
  isLoading = false;
  quantity = 1;
 
  constructor(
    private route: ActivatedRoute,
    private api: Api,
    private alertService: AlertService,
    private cdr : ChangeDetectorRef
  ) {}
 
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.loadProduct(+id);
  }
 
  loadProduct(id: number) {
    this.isLoading = true;
    this.api.getAllProducts(`products/${id}`).subscribe({
      next: (res: any) => {
        this.product = res.data;
        this.isLoading = false;
        this.cdr.detectChanges()
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }
 
  increase() { this.quantity++; }
  decrease() { if (this.quantity > 1) this.quantity--; }
 
  addToCart() {
    this.api.addToCart(this.product.id, this.quantity).subscribe({
      next: () => this.alertService.success(`${this.product.name} added to cart!`),
      error: () => this.alertService.error('Please log in first')
    });
  }
}
