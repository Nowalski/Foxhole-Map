import { Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { authGuard } from './guards/auth.guard';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';

const redirectIfAuthenticated = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getCurrentUser().pipe(
    take(1),
    map(user => {
      if (user) {
        router.navigate(['/map']);
        return false;
      }
      return true;
    })
  );
};

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'map',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [() => redirectIfAuthenticated()]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [() => redirectIfAuthenticated()]
  },
  {
    path: 'map',
    component: MapComponent,
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: 'map'
  }
];
