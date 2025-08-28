import { Routes } from '@angular/router';
import { MapComponent } from './map/map.component';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'map',
    component: MapComponent,
    canActivate: [authGuard]
  }
];
