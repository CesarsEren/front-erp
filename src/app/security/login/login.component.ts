import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/security/authservice.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [AuthService],
  host: { class: 'login-container' },
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      in_usuario: ['', Validators.required],
      in_clave: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { in_usuario, in_clave } = this.loginForm.value;

      this.authService
        .login(in_usuario, in_clave)
        .subscribe(
          (response) => {
            console.log('Login successful:', response);
            // Redirigir al dashboard o a cualquier otra página tras el login exitoso
            this.router.navigate(['/main']);
          },
          (error) => {
            console.error('Login failed:', error.error.out_data.out_mensaje);
            this.errorMessage = error.error.out_data.out_mensaje;
          }
        );
    }
  }
}
