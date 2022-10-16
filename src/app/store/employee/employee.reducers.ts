import { createReducer, on } from '@ngrx/store';
import { Employee } from 'src/app/model/Employee';
import { Shift } from 'src/app/model/Shift';
import {
  deleteEmployee,
  deleteEmployeeFailure,
  deleteEmployeeSuccess,
  loadEmployeeByIdFromRoute,
  loadEmployeeByIdFromRouteFailure,
  loadEmployeeByIdFromRouteSuccess,
  loadEmployees,
  loadEmployeesFailure,
  loadEmployeesSuccess,
} from './employee.actions';

export interface EmployeesState {
  employees: Employee[];
  loadingEmployees: boolean;
  loadingUpsertEmployee: boolean;
  loadingDeleteEmployee: boolean;
  employeeById: Employee | null;
  employeeShiftsById: Shift[];
  loadingEmployeeById: boolean;
}

export const initialState: EmployeesState = {
  employees: [],
  loadingEmployees: false,
  loadingUpsertEmployee: false,
  loadingDeleteEmployee: false,
  employeeById: null,
  employeeShiftsById: [],
  loadingEmployeeById: false,
};

export const employeesReducer = createReducer(
  initialState,
  on(loadEmployees, (state: EmployeesState) => ({
    ...state,
    loadingEmployees: true,
  })),
  on(loadEmployeesSuccess, (state, { employees }) => ({
    ...state,
    employees,
    loadingEmployees: false,
  })),
  on(loadEmployeesFailure, (state) => ({
    ...state,
    loadingEmployees: false,
  })),
  on(deleteEmployee, (state: EmployeesState) => ({
    ...state,
    loadingDeleteEmployee: true,
  })),
  on(deleteEmployeeSuccess, (state) => ({
    ...state,
    loadingDeleteEmployee: false,
  })),
  on(deleteEmployeeFailure, (state) => ({
    ...state,
    loadingDeleteEmployee: false,
  })),
  on(loadEmployeeByIdFromRoute, (state: EmployeesState) => ({
    ...state,
    loadingEmployeeById: true,
  })),
  on(loadEmployeeByIdFromRouteSuccess, (state, { employee }) => ({
    ...state,
    loadingEmployeeById: false,
    employeeById: employee,
  })),
  on(loadEmployeeByIdFromRouteFailure, (state) => ({
    ...state,
    loadingEmployeeById: false,
  }))
);
