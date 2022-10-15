import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-employee-details-page',
  templateUrl: './employee-details-page.component.html',
  styleUrls: ['./employee-details-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeDetailsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
