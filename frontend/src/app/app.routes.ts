import { Routes } from '@angular/router';
import { SigninComponent } from './components/auth/signin.component';
import { SignupComponent } from './components/auth/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { LeaveComponent } from './components/leave/leave.component';
import { PayrollComponent } from './components/payroll/payroll.component';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'leave', component: LeaveComponent },
  { path: 'payroll', component: PayrollComponent },
];
