import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { deleteCookie, getCookie, setCookie } from './request-utils';
import { RequestUtilsService } from './request-utils.service';
import { flatMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface User {
  url: string;
  id: number;
  username: string;
  email: string;
}


@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl;
  user: User;
  awaitUser: Promise<void>;
  isAuthenticatedChanged: EventEmitter<'online' | 'offline'> = new EventEmitter();

  constructor(public http: HttpClient,
              public requestUtils: RequestUtilsService) {
    if (requestUtils.token) {
      this.awaitUser = this.getUserByUsername(getCookie('username')).then(user => {
        this.user = user;
        this.awaitUser = null;
      });
    }
  }

  isAuthenticated() {
    return this.requestUtils.token != null;
  }

  logout() {
    deleteCookie('username');
    deleteCookie('token');
    this.user = null;
    this.requestUtils.token = null;
    this.isAuthenticatedChanged.emit('offline');
  }

  login(username: string, password: string) {
    console.log(this.apiUrl + '/api-token-auth/');
    return this.http.post(this.apiUrl + '/api-token-auth/', {
      username, password
    }, this.requestUtils.requestOptions()).toPromise().then((response: { token: string }) => {
      setCookie('token', response.token);
      this.requestUtils.token = response.token;
      setCookie('username', username);
      return this.getUserByUsername(username).then(user => {
        this.user = user;

        console.log("Ceva", user, this.user)
        this.isAuthenticatedChanged.emit('online');
        return user;
      });
    });
  }

  register(username: string, email: string, password: string) {
    console.log(this.apiUrl + '/api/register/');
    return this.http.post(this.apiUrl + '/api/register/', {
      'username': username,
      'password': password,
      'email': email
    }, this.requestUtils.requestOptions()).toPromise().then((data: {
      user: User,
      token: string
    }) => {
      this.user = data.user;
      setCookie('username', this.user.username);
      this.requestUtils.token = data.token;
      setCookie('token', this.requestUtils.token);
      this.isAuthenticatedChanged.emit('online');
    });
  }

  getUserByUsername(username: string) {
    return this.http.get(this.apiUrl + `/api/user/?username=${username}`, this.requestUtils.tokenRequestOptions())
      .toPromise().then((users: Array<User>) => {
        return users[0];
      });
  }
}
