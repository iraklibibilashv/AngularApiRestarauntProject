import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../services/api';
import { AlertService } from '../services/alert';
@Component({
  selector: 'app-menu',
  imports: [FormsModule, CommonModule, RouterModule,],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})
export class Menu {
  constructor(
    private api: Api,
    private router: RouterModule,
    private cdr: ChangeDetectorRef,
    public alert : AlertService,
    private rout : Router
  ) {}

  filterProducts: any[] = [];
  categoriesArr: any[] = [];

  isLoading = false;
  filterOpen = false;
  selectCategoryName = 'Categories';

  filtersArr: any = {
    Query: '',
    Vegetarian: null,
    Spiciness: 0,
    Rate: 0,
    MinPrice: null,
    MaxPrice: null,
    CategoryId: null,
    Take: 50,
    Page: 1,
  };

  ngOnInit(): void {
    this.api.getAllProducts('categories').subscribe({
      next: (res: any) => {
        this.categoriesArr = Array.isArray(res) ? res : (res.data ?? res.items ?? []);
        this.loadProducts();
        this.cdr.detectChanges();
      },
    });
  }

  loadProducts() {
    this.isLoading = true;
    this.api.getFilter(this.filtersArr).subscribe({
      next: (res: any) => {
        this.filterProducts = res.data.products.map((p: any) => ({
          ...p,
          categoryName: this.getCategoryName(p.categoryId),
        }));
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error(err);
        this.isLoading = false;
        this.cdr.detectChanges();
      },
    });
  }

  loadCategories() {
    this.api.getAllProducts('categories').subscribe({
      next: (res: any) => {
        this.categoriesArr = Array.isArray(res) ? res : (res.data ?? res.items ?? []);
        
      },
      error: (err: any) => console.error(err),
    });
  }
  addToCart(productId: number) {
    console.log('productId:', productId);
  this.api.addToCart(productId, 1).subscribe({
    
    next: () => this.alert.success('Product added to cart'),
    error: (err) => this.alert.error('Please log in first')
  });
}
goToDetails(id: number) {
  this.rout.navigate(['/details', id]);
}


  // ── Filter methods ───────────────────────────────────────

  onSearch(value: string) {
    this.filtersArr.Query = value;
    this.loadProducts();
  }

  onRating(value: number) {
    this.filtersArr.Rate = this.filtersArr.Rate === value ? 0 : value;
    this.loadProducts();
  }

  onSpiciness(value: number) {
    this.filtersArr.Spiciness = value;
    this.loadProducts();
  }

  onMinPrice(value: number) {
    this.filtersArr.MinPrice = value || null;
    this.loadProducts();
  }

  onMaxPrice(value: number) {
    this.filtersArr.MaxPrice = value || null;
    this.loadProducts();
  }

  onVegetarian(value: boolean | null) {
    this.filtersArr.Vegetarian = value;
    this.loadProducts();
  }

  onCategory(id: number | null, name: string = 'Categories') {
    this.filtersArr.CategoryId = id;
    this.selectCategoryName = name;
    this.loadProducts();
  }

  clearAll() {
    this.filtersArr = {
      Query: '',
      Vegetarian: null,
      Spiciness: 0,
      Rate: 0,
      MinPrice: null,
      MaxPrice: null,
      CategoryId: null,
      Take: 50,
      Page: 1,
    };
    this.selectCategoryName = 'Categories';
    this.loadProducts();
  }
  getCategoryName(categoryId: number): string {
    const cat = this.categoriesArr.find((c) => c.id === categoryId);
    return cat ? cat.name : '';
  }

  hasActiveFilters(): boolean {
    return (
      !!this.filtersArr.Search ||
      this.filtersArr.Vegetarian !== null ||
      this.filtersArr.Spiciness > 0 ||
      this.filtersArr.Rate > 0 ||
      this.filtersArr.MinPrice !== null ||
      this.filtersArr.MaxPrice !== null ||
      this.filtersArr.CategoryId !== null
    );
  }
}
