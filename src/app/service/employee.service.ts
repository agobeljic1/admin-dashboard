import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../model/Employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private readonly httpClient: HttpClient) {}

  getEmployees = () => {
    return this.httpClient.get<{ employees: Employee[] }>('/employees');
  };

  createEmployee = (employee) => {
    return this.httpClient.post('/employees', employee);
  };

  updateEmployee = (employee) => {
    return this.httpClient.put('/employees', employee);
  };

  deleteEmployee = (employeeId) => {
    return this.httpClient.delete(`/employees/${employeeId}`);
  };
}
