import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentUser: any = null;
  isAdmin = false;
  activeTab = 'overview';
  dashboardData = {
    totalEmployees: 0,
    pendingLeaves: 0,
    presentToday: 0,
    totalPayroll: 0
  };

  constructor(
    private authService: AuthService,
    private apiService: ApiService,
    private router: Router
  ) {
    this.currentUser = this.authService.getCurrentUser();
    this.isAdmin = this.authService.isAdmin();
  }

  ngOnInit() {
    if (!this.currentUser) {
      this.router.navigate(['/signin']);
    }
  }

  navigateTo(component: string) {
    this.router.navigate([`/${component}`]);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}
