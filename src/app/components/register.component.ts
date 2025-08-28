import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
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
      <p-card header="Register" class="w-full max-w-md shadow-lg">
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <div class="mb-4">
            <span class="p-float-label">
              <input pInputText id="username" formControlName="username" class="w-full" />
              <label for="username">Username</label>
            </span>
            <small class="text-red-500" *ngIf="registerForm.get('username')?.errors?.['required'] && registerForm.get('username')?.touched">
              Username is required
            </small>
          </div>
          
          <div class="mb-4">
            <span class="p-float-label">
              <input pInputText id="email" formControlName="email" class="w-full" />
              <label for="email">Email</label>
            </span>
            <small class="text-red-500" *ngIf="registerForm.get('email')?.errors?.['required'] && registerForm.get('email')?.touched">
              Email is required
            </small>
            <small class="text-red-500" *ngIf="registerForm.get('email')?.errors?.['email'] && registerForm.get('email')?.touched">
              Please enter a valid email
            </small>
          </div>

          <div class="mb-4">
            <span class="p-float-label">
              <input pInputText type="password" id="password" formControlName="password" class="w-full" />
              <label for="password">Password</label>
            </span>
            <small class="text-red-500" *ngIf="registerForm.get('password')?.errors?.['required'] && registerForm.get('password')?.touched">
              Password is required
            </small>
            <small class="text-red-500" *ngIf="registerForm.get('password')?.errors?.['minlength'] && registerForm.get('password')?.touched">
              Password must be at least 6 characters
            </small>
          </div>

          <div class="flex justify-between">
            <p-button type="submit" [disabled]="!registerForm.valid" label="Register"></p-button>
            <p-button type="button" (onClick)="navigateToLogin()" severity="secondary" label="Back to Login"></p-button>
          </div>
        </form>
      </p-card>
      <p-toast></p-toast>
    </div>
  `,
  styles: [`
    :host ::ng-deep .p-card {
      @apply bg-white dark:bg-gray-800;
    }
    :host ::ng-deep .p-inputtext {
      @apply w-full bg-white dark:bg-gray-700;
    }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async onSubmit() {
    if (this.registerForm.valid) {
      try {
        const { email, password, username } = this.registerForm.value;
        await this.authService.register(email, password, username);
        this.messageService.add({
          severity: 'success',
          summary: 'Registration Successful',
          detail: 'You can now login with your credentials'
        });
        this.router.navigate(['/login']);
      } catch (error: any) {
        this.messageService.add({
          severity: 'error',
          summary: 'Registration Failed',
          detail: error.message || 'Please try again later'
        });
      }
    }
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
