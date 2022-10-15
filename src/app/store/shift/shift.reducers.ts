import { createReducer } from '@ngrx/store';

export interface ShiftState {}

export const initialState: ShiftState = {};

export const shiftsReducer = createReducer(initialState);
