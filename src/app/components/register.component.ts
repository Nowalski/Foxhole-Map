import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { SelectButtonModule } from 'primeng/selectbutton';
import { MessageService } from 'primeng/api';
import { AuthService } from '../services/auth.service';
import type { Team } from '../models/user.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    ToastModule,
    SelectButtonModule
  ],
  providers: [MessageService],
  template: /* html */`
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

          <div class="mb-4">
            <label class="block mb-2">Select Your Team</label>
            <p-selectButton [options]="teamOptions" formControlName="team" optionLabel="label" optionValue="value"
              styleClass="w-full">
              <ng-template let-option pTemplate="content">
                <div class="flex items-center gap-2">
                  <i [class]="option.value === 'Colonial' ? 'pi pi-shield' : 'pi pi-flag'"></i>
                  <span>{{option.label}}</span>
                </div>
              </ng-template>
            </p-selectButton>
            <small class="text-red-500" *ngIf="registerForm.get('team')?.errors?.['required'] && registerForm.get('team')?.touched">
              Please select a team
            </small>
          </div>

          <div class="flex justify-between">
            <p-button type="submit" [loading]="loading" [disabled]="!registerForm.valid || loading" label="Register"></p-button>
            <p-button type="button" (click)="navigateToLogin()" severity="secondary" label="Back to Login"></p-button>
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
  protected registerForm: FormGroup;
  protected teamOptions = [
    { label: 'Colonial', value: 'Colonial' as Team },
    { label: 'Warden', value: 'Warden' as Team }
  ];

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      team: ['', [Validators.required]]
    });
  }

  protected loading = false;

  protected onSubmit(): void {
    if (this.registerForm.valid && !this.loading) {
      console.log('Starting registration process...');
      this.loading = true;
      const { email, password, username, team } = this.registerForm.value;
      
      this.authService.register(email, password, username, team)
        .then(() => {
          console.log('Registration successful, showing message...');
          this.messageService.add({
            severity: 'success',
            summary: 'Registration Successful',
            detail: 'You can now login with your credentials'
          });
          
          // Add a small delay before navigation
          setTimeout(() => {
            console.log('Navigating to login...');
            this.router.navigate(['/login']).then(() => {
              console.log('Navigation complete');
            }).catch(err => {
              console.error('Navigation failed:', err);
              this.messageService.add({
                severity: 'error',
                summary: 'Navigation Failed',
                detail: 'Could not navigate to login. Please refresh the page.'
              });
            });
          }, 500);
        })
        .catch((error: any) => {
          console.error('Registration error in component:', error);
          let errorMessage = 'Please try again later';
          if (error.code === 'auth/email-already-in-use') {
            errorMessage = 'This email is already registered';
          } else if (error.code === 'auth/weak-password') {
            errorMessage = 'Password is too weak';
          }
          this.messageService.add({
            severity: 'error',
            summary: 'Registration Failed',
            detail: errorMessage
          });
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }

  protected navigateToLogin(): void {
    this.router.navigate(['/login']);
  }
}
