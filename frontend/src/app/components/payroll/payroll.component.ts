import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-payroll',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payroll.component.html',
  styleUrls: ['./payroll.component.css']
})
export class PayrollComponent implements OnInit {
  payroll: any[] = [];
  currentUser: any = null;
  loading = false;
  isAdmin = false;

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
    this.loadPayroll();
  }

  loadPayroll() {
    this.loading = true;
    const request = this.isAdmin ? this.apiService.getAllPayroll() : this.apiService.getMyPayroll();
    request.subscribe({
      next: (data) => {
        this.payroll = data;
        this.loading = false;
      }
    });
  }

  getStatusColor(status: string): string {
    const colors: any = {
      'pending': '#ffc107',
      'processed': '#17a2b8',
      'paid': '#28a745'
    };
    return colors[status] || '#666';
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
