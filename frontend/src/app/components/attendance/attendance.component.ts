import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.css']
})
export class AttendanceComponent implements OnInit {
  attendance: any[] = [];
  currentUser: any = null;
  loading = false;
  isAdmin = false;
  newAttendance = {
    date: new Date().toISOString().split('T')[0],
    status: 'present',
    remarks: ''
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
    this.loadAttendance();
  }

  loadAttendance() {
    this.loading = true;
    const request = this.isAdmin ? this.apiService.getAllAttendance() : this.apiService.getMyAttendance();
    request.subscribe({
      next: (data) => {
        this.attendance = data;
        console.log('Attendance records:', data);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading attendance:', err);
        this.loading = false;
      }
    });
  }

  markAttendance() {
    this.apiService.markAttendance(this.newAttendance).subscribe({
      next: () => {
        alert('Attendance marked successfully');
        this.newAttendance = { date: new Date().toISOString().split('T')[0], status: 'present', remarks: '' };
        this.loadAttendance();
      }
    });
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  getStatusColor(status: string): string {
    const colors: any = {
      'present': '#28a745',
      'absent': '#dc3545',
      'half-day': '#ffc107',
      'leave': '#17a2b8'
    };
    return colors[status] || '#666';
  }
}
