import { Routes } from '@angular/router';

export const routes: Routes = [
        {
    path: ``,
  redirectTo: 'home',
  pathMatch: 'full',
},
     
    { 
        path: 'header', loadComponent: () => import('./header/header').then(m => m.Header)
    },
    { 
        path: 'footer', loadComponent: () => import('./footer/footer').then(m => m.Footer)
    },
    { 
        path: 'home', loadComponent: () => import('./home/home').then(m => m.Home)
    },
    { 
        path: 'menu', loadComponent: () => import('./menu/menu').then(m => m.Menu)
    },
    { 
        path: 'cart', loadComponent: () => import('./cart/cart').then(m => m.Cart)
    },
    {
        path: 'register', loadComponent: () => import('./register/register').then(m => m.Register)
    },
    {
        path: 'login', loadComponent: () => import('./login/login').then(m => m.Login)
    },
    {
        path: 'details/:id', loadComponent: () => import('./details/details').then(m => m.Details)
    },
    {
        path: 'verify-email', loadComponent: () => import('./verify-email/verify-email').then(m => m.VerifyEmail)

    },
    {
        path: 'forgot-password', loadComponent: () => import('./forgot-password/forgot-password').then(m => m.ForgotPassword)
    },
    {
        path: 'profile', loadComponent: () => import('./profile/profile').then(m => m.Profile)
    },
    {
        path: 'reset-password', loadComponent: () => import('./reset-password/reset-password').then(m => m.ResetPassword)
    }, 
    {
        path : "**", loadComponent: () => import('./error/error').then(m => m.Error)
    }

];
