import { Component, OnInit, inject } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { User } from './models/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { MenubarModule } from 'primeng/menubar';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    FormsModule,
    CommonModule,
    ButtonModule,
    MenubarModule
  ],
  template: `
    <div class="min-h-screen bg-gray-100 dark:bg-gray-900">
      <p-menubar *ngIf="isLoggedIn$ | async" [model]="menuItems" [class]="'shadow-md'">
        <ng-template pTemplate="end">
          <p-button (onClick)="logout()" label="Logout" severity="secondary"></p-button>
        </ng-template>
      </p-menubar>
      <router-outlet></router-outlet>
    </div>
  `,
  standalone: true,
  styles: [`
    :host ::ng-deep .p-menubar {
      @apply bg-white dark:bg-gray-800 border-none rounded-none;
    }
  `]
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  isLoggedIn$ = this.authService.getCurrentUser();
  menuItems = [
    {
      label: 'Map',
      icon: 'pi pi-map',
      routerLink: '/map'
    }
  ];

  ngOnInit() {
    // Check authentication state on app start
    this.isLoggedIn$.subscribe((user: User | null) => {
      if (!user && !this.router.url.includes('register')) {
        this.router.navigate(['/login']);
      }
    });
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }
}
