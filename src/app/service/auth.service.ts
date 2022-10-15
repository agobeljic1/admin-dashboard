import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly httpClient: HttpClient) {}

  login(user: User) {
    return this.httpClient.post('/login', user, {
      withCredentials: true,
    });
  }

  register(user: User) {
    return this.httpClient.post('/signup', user);
  }

  refreshToken() {
    return this.httpClient.get('/refresh-token', {
      withCredentials: true,
    });
  }

  logout() {
    return this.httpClient.post('/logout', null, {
      withCredentials: true,
    });
  }

  me() {
    return this.httpClient.get('/me');
  }
}
