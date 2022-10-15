import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { EmployeeActions, EmployeeSelectors } from 'src/app/store/employee';

@Component({
  selector: 'app-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesPageComponent implements OnInit {
  employees$!: Observable<any>;
  loadingEmployees$!: Observable<boolean>;
  selectedEmployeesMap$!: Observable<{ [key: string]: boolean }>;

  displayedColumns = ['id', 'name', 'birthDate', 'address'];
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.dispatch(EmployeeActions.loadEmployees());

    this.employees$ = this.store.select(EmployeeSelectors.selectAllEmployees);

    this.loadingEmployees$ = this.store.select(
      EmployeeSelectors.selectLoadingEmployees
    );
  }

  openCreateNewEmployeeModal() {
    this.store.dispatch(EmployeeActions.openUpsertmployeeModal());
  }

  onClickEmployee({ id }) {
    this.store.dispatch(
      EmployeeActions.openEmployeeDetails({ employeeId: id })
    );
  }
}
