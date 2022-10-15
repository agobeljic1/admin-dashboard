import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { AuthSelectors } from 'src/app/store/auth';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  loggedUsername$!: Observable<string | null>;

  constructor(private readonly store: Store<AppState>) {}

  ngOnInit(): void {
    this.loggedUsername$ = this.store.select(
      AuthSelectors.selectLoggedUsername
    );
  }
}
