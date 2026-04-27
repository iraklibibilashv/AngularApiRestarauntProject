import { ChangeDetectorRef, Component } from '@angular/core';
import { Api } from '../services/api';
import { Router, RouterModule } from '@angular/router';
import { AlertService } from '../services/alert';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
  user: any = null;
  isLoading = false;
  isUpdating = false;
  activeTab = 'edit';
  showDeleteConfirm = false;

  showOld = false;
  showNew = false;
  showConfirm = false;

  editData = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    picture: '',
    address: '',
    age: 0,
  };

  passData = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  isAdmin = false;
  categoriesList: any[] = [];
  newCategoryName = '';
  editingCatId: number | null = null;
  editingCatName = '';
  ingredientsInput = '';
  newProduct: any = {
    name: '',
    description: '',
    vegetarian: false,
    spiciness: 0,
    price: 0,
    image: '',
    method: '',
    ingredients: [],
    categoryId: null,
  };

  constructor(
    private api: Api,
    private router: Router,
    private alertService: AlertService,
    private cdr : ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
    this.loadProfile();
    if (this.isAdmin) this.loadCategories();
  }

  loadProfile() {
    this.isLoading = true;
    this.api.getAllProducts('users/profile').subscribe({
      next: (res: any) => {
        this.user = res.data ?? res;
        this.editData = {
          firstName: this.user.firstName || '',
          lastName: this.user.lastName || '',
          phoneNumber: this.user.phoneNumber || '',
          picture: this.user.picture || '',
          address: this.user.address || '',
          age: this.user.age || 0,
        };
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      },
    });
  }

  onEdit() {
    this.isUpdating = true;
    this.api.editProfile(this.editData).subscribe({
      next: (res) => {
        this.alertService.success('Profile updated successfully!');
        this.loadProfile();
        console.log('success:', res)
        this.isUpdating = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.alertService.error(err.error?.error?.detail || 'Update failed.');
        this.isUpdating = false;
        this.cdr.detectChanges();
      },
    });
  }

  onChangePassword() {
    if (this.passData.newPassword !== this.passData.confirmPassword) {
      this.alertService.error('Passwords do not match!');
      return;
    }
    this.isUpdating = true;
    this.api.changePassword(this.passData).subscribe({
      next: () => {
        this.alertService.success('Password changed successfully!');
        this.passData = { oldPassword: '', newPassword: '', confirmPassword: '' };
        this.isUpdating = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.alertService.error(err.error?.error?.detail || 'Could not change password.');
        this.isUpdating = false;
          this.cdr.detectChanges();
      },
    });
  }

  onDelete() {
    this.api.deleteAccount().subscribe({
      next: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        this.alertService.info('Account deleted.');
        this.cdr.detectChanges()
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.alertService.error(err.error?.error?.detail || 'Could not delete account.');
        this.showDeleteConfirm = false;
        this.cdr.detectChanges();
      },
    });
  }
  onRefreshToken() {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      this.alertService.error('No refresh token found.');
      return;
    }
    this.api.refreshToken(refreshToken).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.data.accessToken);
        this.alertService.success('Session refreshed!');
        this.cdr.detectChanges();
      },
      error: () => this.alertService.error('Session expired. Please log in again.'),
    });
  }
  loadCategories() {
  this.api.getAllProducts('categories').subscribe({
    next: (res: any) => {
      this.categoriesList = Array.isArray(res) ? res : (res.data ?? res.items ?? []);
      this.cdr.detectChanges();
    },
    error: () => {
      this.alertService.error('Failed to load categories.');
      this.cdr.detectChanges();
    }
  });
}
 
// Categories
onCreateCategory() {
  if (!this.newCategoryName.trim()) return;
  this.isUpdating = true;
  this.api.createCategory({ name: this.newCategoryName }).subscribe({
    next: () => {
      this.alertService.success('Category created!');
      this.newCategoryName = '';
      this.loadCategories();
      this.isUpdating = false;
    },
    error: () => { this.alertService.error('Failed to create category.'); this.isUpdating = false; }
  });
}
 
startEditCat(cat: any) {
  this.editingCatId = cat.id;
  this.editingCatName = cat.name;
  this.cdr.detectChanges();
}
 
onEditCategory(id: number) {
  this.api.editCategory(id, { name: this.editingCatName }).subscribe({
    next: () => {
      this.alertService.success('Category updated!');
      this.editingCatId = null;
      this.loadCategories();
      this.cdr.detectChanges();
    },
    error: () => {
      this.alertService.error('Failed to update category.')
      this.cdr.detectChanges();
    }
  });
}
 
onDeleteCategory(id: number) {
  this.api.deleteCategory(id).subscribe({
    next: () => {
      this.alertService.success('Category deleted!');
      this.loadCategories();
      this.cdr.detectChanges();
    },
    error: () => {
      this.alertService.error('Failed to delete category.')
      this.cdr.detectChanges();
    }
  });
}
 
// Products
onCreateProduct() {
  this.isUpdating = true;
  const body = {
    ...this.newProduct,
    ingredients: this.ingredientsInput.split(',').map((s: string) => s.trim()).filter(Boolean)
  };
  this.api.createProduct(body).subscribe({
    next: () => {
      this.alertService.success('Product created!');
      this.ingredientsInput = '';
      this.newProduct = {
        name: '', description: '', vegetarian: false,
        spiciness: 0, price: 0, image: '', method: '',
        ingredients: [], categoryId: null
      };
      this.isUpdating = false;
      this.cdr.detectChanges();
    },
    error: () => {
       this.alertService.error('Failed to create product.'); 
       this.isUpdating = false;
       this.cdr.detectChanges();
       }
  });
}
}
