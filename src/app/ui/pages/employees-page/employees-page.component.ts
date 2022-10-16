import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/model/Employee';
import { AppState } from 'src/app/store/app.state';
import { EmployeeActions, EmployeeSelectors } from 'src/app/store/employee';

@Component({
  selector: 'app-employees-page',
  templateUrl: './employees-page.component.html',
  styleUrls: ['./employees-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesPageComponent implements OnInit {
  employees$!: Observable<Employee[]>;
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
    this.store.dispatch(
      EmployeeActions.openUpsertEmployeeModal({ employee: null })
    );
  }

  onClickEmployee({ id }) {
    this.store.dispatch(
      EmployeeActions.openEmployeeDetails({ employeeId: id })
    );
  }
}
