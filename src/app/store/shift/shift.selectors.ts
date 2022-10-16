import { createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { ShiftsState } from './shift.reducers';

export const selectShifts = (state: AppState) => state.shiftsState;

export const selectAllShifts = createSelector(
  selectShifts,
  (state: ShiftsState) => state.shifts
);

export const selectLoadingShifts = createSelector(
  selectShifts,
  (state: ShiftsState) => state.loadingShifts
);

export const selectLoadingUpsertShift = createSelector(
  selectShifts,
  (state: ShiftsState) => state.loadingUpsertShift
);
