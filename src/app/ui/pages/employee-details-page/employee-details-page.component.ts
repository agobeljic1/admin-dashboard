import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/model/Employee';
import { Shift } from 'src/app/model/Shift';
import { AppState } from 'src/app/store/app.state';
import { EmployeeActions, EmployeeSelectors } from 'src/app/store/employee';
import { ShiftActions, ShiftSelectors } from 'src/app/store/shift';

@Component({
  selector: 'app-employee-details-page',
  templateUrl: './employee-details-page.component.html',
  styleUrls: ['./employee-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeDetailsPageComponent implements OnInit {
  employee$!: Observable<Employee | null>;
  employeeShifts$!: Observable<Shift[]>;
  loading$!: Observable<boolean>;
  loadingShifts$!: Observable<boolean>;

  displayedColumns = ['id', 'clockIn', 'clockOut', 'description', 'options'];

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.employee$ = this.store.select(EmployeeSelectors.selectEmployeeById);

    const employeeId = this.activatedRoute.snapshot.params['id'];
    this.store.dispatch(
      EmployeeActions.loadEmployeeByIdFromRoute({
        employeeId,
      })
    );

    this.store.dispatch(
      ShiftActions.loadShifts({
        employeeId,
      })
    );

    this.employee$ = this.store.select(EmployeeSelectors.selectEmployeeById);

    this.loading$ = this.store.select(
      EmployeeSelectors.selectLoadingEmployeeById
    );

    this.employeeShifts$ = this.store.select(ShiftSelectors.selectAllShifts);

    this.loadingShifts$ = this.store.select(ShiftSelectors.selectLoadingShifts);
  }

  deleteEmployee(employee) {
    this.store.dispatch(EmployeeActions.deleteEmployee({ employee }));
  }

  updateEmployee(employee) {
    this.store.dispatch(EmployeeActions.openUpsertEmployeeModal({ employee }));
  }

  openNewShiftByEmployeeId(employee) {
    this.store.dispatch(
      ShiftActions.openUpsertShiftModal({ employee, shift: null })
    );
  }

  onClickShift(employee, shift) {
    this.store.dispatch(ShiftActions.openUpsertShiftModal({ employee, shift }));
  }

  deleteShift(event, shift) {
    event.stopPropagation();
    this.store.dispatch(ShiftActions.deleteShift({ shift }));
  }
}
