import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-leave',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './leave.component.html',
  styleUrls: ['./leave.component.css']
})
export class LeaveComponent implements OnInit {
  leaves: any[] = [];
  currentUser: any = null;
  loading = false;
  isAdmin = false;
  showForm = false;
  newLeave = {
    leaveType: 'paid',
    startDate: '',
    endDate: '',
    numberOfDays: 1,
    reason: ''
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
    this.loadLeaves();
  }

  loadLeaves() {
    this.loading = true;
    const request = this.isAdmin ? this.apiService.getAllLeaves() : this.apiService.getMyLeaves();
    request.subscribe({
      next: (data) => {
        this.leaves = data;
        this.loading = false;
      }
    });
  }

  applyLeave() {
    if (!this.newLeave.startDate || !this.newLeave.endDate) {
      alert('Please fill all required fields');
      return;
    }

    this.apiService.applyForLeave(this.newLeave).subscribe({
      next: () => {
        alert('Leave request submitted successfully');
        this.showForm = false;
        this.newLeave = { leaveType: 'paid', startDate: '', endDate: '', numberOfDays: 1, reason: '' };
        this.loadLeaves();
      }
    });
  }

  approveLeave(leaveId: string) {
    this.apiService.approveLeave(leaveId, { status: 'approved' }).subscribe({
      next: () => {
        alert('Leave approved');
        this.loadLeaves();
      }
    });
  }

  rejectLeave(leaveId: string) {
    this.apiService.approveLeave(leaveId, { status: 'rejected' }).subscribe({
      next: () => {
        alert('Leave rejected');
        this.loadLeaves();
      }
    });
  }

  getStatusColor(status: string): string {
    const colors: any = {
      'pending': '#ffc107',
      'approved': '#28a745',
      'rejected': '#dc3545'
    };
    return colors[status] || '#666';
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }
}
