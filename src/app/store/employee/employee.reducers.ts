import { createReducer } from '@ngrx/store';

export interface EmployeesState {}

export const initialState: EmployeesState = {};

export const employeesReducer = createReducer(initialState);
