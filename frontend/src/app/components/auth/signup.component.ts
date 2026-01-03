import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  form = {
    employeeId: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'employee'
  };
  loading = false;
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    if (!this.form.employeeId || !this.form.email || !this.form.password) {
      this.error = 'All fields are required';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.signup(this.form).subscribe({
      next: (response) => {
        this.authService.setUser(response.token, response.user);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Signup failed';
        this.loading = false;
      }
    });
  }

  goToSignin() {
    this.router.navigate(['/signin']);
  }
}
