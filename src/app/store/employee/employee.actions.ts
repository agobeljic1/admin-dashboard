import { createAction, props } from '@ngrx/store';
import { Employee } from 'src/app/model/Employee';
import { Shift } from 'src/app/model/Shift';

export const loadEmployees = createAction('[Employee Page] Load Employees');

export const loadEmployeesSuccess = createAction(
  '[Employee API] Employee Load Success',
  props<{ employees: Employee[] }>()
);

export const loadEmployeesFailure = createAction(
  '[Employee API] Employee Load Failure'
);

export const openUpsertEmployeeModal = createAction(
  '[Upsert Employee Modal] Open Upsert Employee Modal',
  props<{ employee: Employee | null }>()
);

export const openUpsertEmployeeModalSuccess = createAction(
  '[Upsert Employee Modal] Open Upsert Employee Success'
);

export const closeUpsertEmployeeModal = createAction(
  '[Upsert Employee Modal] Close Upsert Employee Modal'
);

export const createEmployee = createAction(
  '[Upsert Employee Modal] Create Employee',
  props<{ employee: Employee }>()
);

export const createEmployeeSuccess = createAction(
  '[Employee API] Create Employee Success',
  props<{ message: string }>()
);

export const createEmployeeFailure = createAction(
  '[Employee API] Create Employee Failure',
  props<{ message: string }>()
);

export const updateEmployee = createAction(
  '[Upsert Employee Modal] Update Employee',
  props<{ employee: Employee }>()
);

export const updateEmployeeSuccess = createAction(
  '[Employee API] Update Employee Success',
  props<{ message: string; employeeId: string }>()
);

export const updateEmployeeFailure = createAction(
  '[Employee API] Update Employee Failure',
  props<{ message: string }>()
);

export const deleteEmployee = createAction(
  '[Employee Details Page] Delete Employee',
  props<{ employee: Employee }>()
);

export const deleteEmployeeSuccess = createAction(
  '[Employee Details Page] Delete Employee Success',
  props<{ message: string }>()
);

export const deleteEmployeeFailure = createAction(
  '[Employee Details Page] Delete Employee Failure',
  props<{ message: string }>()
);

export const closeAllDialogsSuccess = createAction(
  '[Employee Dialogs] Close All Dialogs Success'
);

export const openEmployeeDetails = createAction(
  '[Employees page] Open Employee Details',
  props<{ employeeId: string }>()
);

export const loadEmployeeByIdFromRoute = createAction(
  '[Employee Details Page] Load Employee By Id From Route',
  props<{ employeeId: string }>()
);

export const loadEmployeeByIdFromRouteSuccess = createAction(
  '[Employee Details Page] Load Employee By Id From Route Success',
  props<{ employee: Employee }>()
);

export const loadEmployeeByIdFromRouteFailure = createAction(
  '[Employee Details Page] Load Employee By Id From Route Failure',
  props<{ message: string }>()
);

export const redirectToEmployeesSuccess = createAction(
  '[Employee Details Page] Redirect to Employees Success'
);

export const showMessageSuccess = createAction(
  '[Employee API] Show Message Success'
);
