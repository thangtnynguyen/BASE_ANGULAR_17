import { Routes } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { SigninComponent } from './modules/signin/signin.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: 'signin',
    component: SigninComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
