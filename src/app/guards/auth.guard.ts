import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('Auth guard checking authentication...');

  return authService.getCurrentUser().pipe(
    take(1),
    map(user => {
      console.log('Auth guard user state:', user);
      if (user) {
        console.log('User is authenticated, allowing navigation');
        return true;
      }
      console.log('User is not authenticated, redirecting to login');
      router.navigate(['/login']);
      return false;
    })
  );
};
