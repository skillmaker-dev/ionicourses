import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
const routes: Routes = [
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then(m => m.WelcomePageModule)
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'authentication',
    loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'registration',
    loadChildren: () => import('./registration/registration.module').then(m => m.RegistrationPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./verify-email/verify-email.module').then(m => m.VerifyEmailPageModule), canActivate: [AuthGuard]
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./details/details.module').then(m => m.DetailsPageModule)
  },
  {
    path: 'successful-register',
    loadChildren: () => import('./successful-register/successful-register.module').then( m => m.SuccessfulRegisterPageModule)
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then( m => m.ResetPasswordPageModule)
  },
  {
    path: 'subscriptions',
    loadChildren: () => import('./subscriptions/subscriptions.module').then( m => m.SubscriptionsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
