import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any = null;
  isEditing = false;
  loading = false;
  currentUser: any = null;

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {
    this.currentUser = this.authService.getCurrentUser();
  }

  ngOnInit() {
    if (!this.currentUser) {
      this.router.navigate(['/signin']);
    }
    this.loadProfile();
  }

  loadProfile() {
    this.apiService.getEmployeeById(this.currentUser.id).subscribe({
      next: (data) => {
        this.profile = { ...data };
      }
    });
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }

  saveProfile() {
    this.loading = true;
    this.apiService.updateEmployeeProfile(this.currentUser.id, this.profile).subscribe({
      next: () => {
        this.isEditing = false;
        this.loading = false;
        alert('Profile updated successfully');
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
