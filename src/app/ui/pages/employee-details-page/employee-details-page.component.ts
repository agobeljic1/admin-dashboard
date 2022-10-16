import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/model/Employee';
import { Shift } from 'src/app/model/Shift';
import { AppState } from 'src/app/store/app.state';
import { EmployeeActions, EmployeeSelectors } from 'src/app/store/employee';

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
      EmployeeActions.loadEmployeeShiftsByIdFromRoute({
        employeeId,
      })
    );

    this.employee$ = this.store.select(EmployeeSelectors.selectEmployeeById);

    this.employeeShifts$ = this.store.select(
      EmployeeSelectors.selectEmployeeShiftsById
    );

    this.loading$ = this.store.select(
      EmployeeSelectors.selectLoadingEmployeeById
    );

    this.loadingShifts$ = this.store.select(
      EmployeeSelectors.selectLoadingEmployeeShiftsById
    );
  }

  deleteEmployee(employee) {
    this.store.dispatch(EmployeeActions.deleteEmployee({ employee }));
  }

  updateEmployee(employee) {
    this.store.dispatch(EmployeeActions.openUpsertEmployeeModal({ employee }));
  }
}
