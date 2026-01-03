import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://dayflow-backend.onrender.com/api';

  constructor(private http: HttpClient) {}

  // Employees
  getAllEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}/employees`);
  }

  getEmployeeById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/employees/${id}`);
  }

  updateEmployeeProfile(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/employees/${id}`, data);
  }

  updateEmployeeSalary(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/employees/${id}/salary`, data);
  }

  // Attendance
  getMyAttendance(): Observable<any> {
    return this.http.get(`${this.apiUrl}/attendance/my-attendance`);
  }

  getAllAttendance(): Observable<any> {
    return this.http.get(`${this.apiUrl}/attendance/all`);
  }

  markAttendance(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/attendance`, data);
  }

  updateAttendance(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/attendance/${id}`, data);
  }

  // Leave
  applyForLeave(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/leave/apply`, data);
  }

  getMyLeaves(): Observable<any> {
    return this.http.get(`${this.apiUrl}/leave/my-leaves`);
  }

  getAllLeaves(): Observable<any> {
    return this.http.get(`${this.apiUrl}/leave/all`);
  }

  approveLeave(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/leave/${id}/approve`, data);
  }

  // Payroll
  getMyPayroll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/payroll/my-payroll`);
  }

  getAllPayroll(): Observable<any> {
    return this.http.get(`${this.apiUrl}/payroll/all`);
  }

  createPayroll(employeeId: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/payroll/${employeeId}`, data);
  }
}
