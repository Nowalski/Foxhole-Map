import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    ToastModule
  ],
  providers: [MessageService],
  template: `
    <div class="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-900">
      <p-card header="Login" class="w-full max-w-md shadow-lg">
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <div class="mb-4">
            <span class="p-float-label">
              <input pInputText id="email" formControlName="email" class="w-full" />
              <label for="email">Email</label>
            </span>
            <small class="text-red-500" *ngIf="loginForm.get('email')?.errors?.['required'] && loginForm.get('email')?.touched">
              Email is required
            </small>
            <small class="text-red-500" *ngIf="loginForm.get('email')?.errors?.['email'] && loginForm.get('email')?.touched">
              Please enter a valid email
            </small>
          </div>
          <div class="mb-4">
            <span class="p-float-label">
              <input pInputText id="password" type="password" formControlName="password" class="w-full" />
              <label for="password">Password</label>
            </span>
            <small class="text-red-500" *ngIf="loginForm.get('password')?.errors?.['required'] && loginForm.get('password')?.touched">
              Password is required
            </small>
          </div>
          <div class="flex justify-between">
            <p-button type="submit" [loading]="loading" [disabled]="!loginForm.valid || loading" label="Login"></p-button>
            <p-button type="button" (click)="navigateToRegister()" severity="secondary" label="Register"></p-button>
          </div>
        </form>
      </p-card>
      <p-toast></p-toast>
    </div>
  `
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  protected loading = false;

  protected onSubmit(): void {
    if (this.loginForm.valid && !this.loading) {
      console.log('Starting login process...');
      this.loading = true;
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email, password)
        .then(() => {
          console.log('Login successful, navigating...');
          // Add a small delay to ensure Firebase auth state is updated
          setTimeout(() => {
            this.router.navigate(['/map']).then(() => {
              console.log('Navigation complete');
            }).catch(err => {
              console.error('Navigation failed:', err);
              this.messageService.add({
                severity: 'error',
                summary: 'Navigation Failed',
                detail: 'Could not navigate to map. Please try again.'
              });
            });
          }, 500);
        })
        .catch((error: any) => {
          console.error('Login error in component:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Login Failed',
            detail: error.message || 'Please check your credentials and try again.'
          });
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
