import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Api } from '../../services/api';

export interface MenuFilters {
  search: string;
  vegetarian: boolean | null;
  spiciness: number;     // 0 = Any, 1–5
  rating: number;        // 0 = Any, 1–5
  minPrice: number | null;
  maxPrice: number | null;
  category: string | null;
}

@Component({
  selector: 'app-menu',
  imports: [FormsModule,CommonModule,RouterModule],
  templateUrl: './menu.html',
  styleUrl: './menu.scss',
})

export class Menu {
  constructor(private api : Api,
    private router : RouterModule,
    private cdr : ChangeDetectorRef
  ){}

  filters: MenuFilters = this.defaultFilters();
 

  filterOpen = false;
  resultCount = 0; 
  filterProducts : any[] = []
  categoriesArr : any[] = []
 

  categories: string[] = []
 
  ngOnInit(){
    this.api.getAllProducts(`products/filter?Take=50&Page=1`).subscribe({
      next: (data : any) => {
        this.filterProducts = data.data.products
        console.log(this.filterProducts);
        this.cdr.detectChanges()
        
        this.api.getAllProducts(`categories`).subscribe({
          next : (data : any) => {
            this.categoriesArr = data.data
            this.cdr.detectChanges()
            console.log(this.categoriesArr);
            

          }
        })
        

      }
    })

    

  }

  setRating(star: number): void {
    this.filters.rating = this.filters.rating === star ? 0 : star;
    this.onFilterChange();
  }
 

  onFilterChange(): void {
    //
    // this.filteredProducts = this.allProducts.filter(p => {
    //   if (this.filters.search && !p.name.toLowerCase().includes(this.filters.search.toLowerCase())) return false;
    //   if (this.filters.vegetarian !== null && p.isVegetarian !== this.filters.vegetarian) return false;
    //   if (this.filters.spiciness > 0 && p.spiciness < this.filters.spiciness) return false;
    //   if (this.filters.rating > 0 && p.rating < this.filters.rating) return false;
    //   if (this.filters.minPrice !== null && p.price < this.filters.minPrice) return false;
    //   if (this.filters.maxPrice !== null && p.price > this.filters.maxPrice) return false;
    //   if (this.filters.category && p.category !== this.filters.category) return false;
    //   return true;
    // });
    //
    // this.resultCount = this.filteredProducts.length;
  }
 
  hasActiveFilters(): boolean {
    const f = this.filters;
    return (
      f.search !== '' ||
      f.vegetarian !== null ||
      f.spiciness !== 0 ||
      f.rating !== 0 ||
      f.minPrice !== null ||
      f.maxPrice !== null ||
      f.category !== null
    );
  }
 
  clearAll(): void {
    this.filters = this.defaultFilters();
    this.onFilterChange();
  }
 
  private defaultFilters(): MenuFilters {
    return {
      search: '',
      vegetarian: null,
      spiciness: 0,
      rating: 0,
      minPrice: null,
      maxPrice: null,
      category: null
    };
  }
}
