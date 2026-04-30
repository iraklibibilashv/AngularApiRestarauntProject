# AngularApiRestarauntProject

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
# 🍽️ Step Restaurant

A full-featured restaurant web application built with **Angular 17+**, consuming the Step Academy REST API. Features JWT authentication, product browsing with filters, cart management, user profiles, and an admin panel.

---

## 🚀 Tech Stack

- **Framework:** Angular 17+ (Standalone Components)
- **Styling:** SCSS (custom design system, no UI library)
- **HTTP:** Angular HttpClient
- **State:** Angular Signals
- **Fonts:** Playfair Display, Cormorant Garamond (Google Fonts)
- **API:** Step Academy Restaurant API (`restaurantapi.stepacademy.ge`)

---

## 📁 Project Structure

```
src/
├── app/
│   ├── services/
│   │   ├── api.service.ts        # All HTTP calls + auth headers
│   │   └── alert.service.ts      # Global toast notifications
│   ├── components/
│   │   ├── header/               # Sticky header with auth state
│   │   ├── footer/               # Footer with nav + social links
│   │   └── alert/                # Toast alert component
│   ├── pages/
│   │   ├── home/                 # Landing page
│   │   ├── menu/                 # Product listing + filters
│   │   ├── details/              # Product detail page
│   │   ├── cart/                 # Shopping cart
│   │   ├── profile/              # User account + admin panel
│   │   └── error/                # 404 Not Found
│   └── auth/
│       ├── login/
│       ├── register/
│       ├── verify-email/
│       ├── forgot-password/
│       └── reset-password/
```

---

## 📄 Pages

| Page | Route | Description |
|---|---|---|
| Home | `/` | Hero, popular dishes, our story |
| Menu | `/menu` | Products with filters + search |
| Product Details | `/details/:id` | Full product info + add to cart |
| Cart | `/cart` | Cart items, quantity, checkout |
| Login | `/login` | Email + password login |
| Register | `/register` | Create new account |
| Verify Email | `/verify-email` | Email verification code |
| Forgot Password | `/forgot-password` | Request reset token |
| Reset Password | `/reset-password` | Set new password with token |
| Profile | `/profile` | Edit profile, change password |
| 404 | `**` | Not found page |

---

## 🔐 Authentication

JWT-based auth using `localStorage`:

```
localStorage:
  token          → accessToken (Bearer)
  refreshToken   → used to refresh session
  isAdmin        → "true" if admin user
```

The `Api` service automatically attaches headers:

```typescript
getHeaders() {
  const token = localStorage.getItem('token');
  return new HttpHeaders({
    'X-API-KEY': this.authKey,
    ...(token && { Authorization: `Bearer ${token}` }),
  });
}
```

---

## 🔌 API Endpoints Used

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/register` | Register |
| PUT | `/api/auth/verify-email` | Verify email with code |
| POST | `/api/auth/resend-email-verification/{email}` | Resend verification |
| POST | `/api/auth/forgot-password/{email}` | Request reset token |
| PUT | `/api/auth/reset-password` | Reset password |
| POST | `/api/auth/refresh-access-token/{token}` | Refresh access token |

### Users
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/users/me` | Current user basic info |
| GET | `/api/users/profile` | Current user full profile |
| PUT | `/api/users/edit` | Edit profile |
| PUT | `/api/users/change-password` | Change password |
| DELETE | `/api/users/delete` | Delete account |

### Products
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products/filter` | Filter products |
| GET | `/api/products/{id}` | Product details |
| POST | `/api/products` | Create product (Admin) |
| PUT | `/api/products/{id}` | Edit product (Admin) |
| DELETE | `/api/products/{id}` | Delete product (Admin) |

### Categories
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/categories` | All categories |
| POST | `/api/categories` | Create category (Admin) |
| PUT | `/api/categories/{id}` | Edit category (Admin) |
| DELETE | `/api/categories/{id}` | Delete category (Admin) |

### Cart
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/cart` | Get cart items |
| POST | `/api/cart/add-to-cart` | Add item to cart |
| PUT | `/api/cart/edit-quantity` | Update item quantity |
| DELETE | `/api/cart/remove-from-cart/{itemId}` | Remove item |
| POST | `/api/cart/checkout` | Checkout |

---

## 🎛️ Menu Filters

Filters send query params to `/api/products/filter`:

| Filter | Param | Type |
|---|---|---|
| Search | `Query` | string |
| Vegetarian | `Vegetarian` | boolean |
| Spiciness | `Spiciness` | int (0–5) |
| Min Rating | `Rate` | double |
| Min Price | `MinPrice` | double |
| Max Price | `MaxPrice` | double |
| Category | `CategoryId` | int |

---

## 🔔 Alert System

Global toast notifications via `AlertService`:

```typescript
this.alertService.success('Added to cart!');
this.alertService.error('Please log in first');
this.alertService.warning('Check your input');
this.alertService.info('Code sent to email');
```

Add `<app-alert>` once in `app.component.html` — works everywhere.

---

## 👑 Admin Panel

Visible in `/profile` only when `localStorage.getItem('isAdmin') === 'true'`.

Admin tabs:
- **Categories** — create, edit, delete
- **Products** — create with full fields (name, price, description, category, spiciness, vegetarian, image, method, ingredients)

---

## 🏁 Getting Started

```bash
# Install dependencies
npm install

# Run development server
ng serve

# Build for production
ng build
```

Open `http://localhost:4200` in your browser.

---

## 🌐 Environment

The API base URL and key are configured in `api.service.ts`:

```typescript
private baseUrl = 'https://restaurantapi.stepacademy.ge/api/';
private authKey = 'YOUR-API-KEY';
```

---

## 👨‍💻 Author

Built by **Irakli** as part of the Step Academy frontend curriculum.
