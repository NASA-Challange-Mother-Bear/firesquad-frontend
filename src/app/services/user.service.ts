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
  awaitUser: Observable<void>;
  isAuthenticatedChanged: EventEmitter<'online'|'offline'> = new EventEmitter();

  constructor(public http: HttpClient,
              public requestUtils: RequestUtilsService) {
    if (requestUtils.token) {
      this.awaitUser = this.getUserByUsername(getCookie('username')).pipe(map(user => {
        this.user = user;
      }));
    }
  }

  login(username: string, password: string) {
    return this.http.post(this.apiUrl + '/api-token-auth/', {
      username, password
    }, this.requestUtils.requestOptions()).pipe(flatMap((response: { token: string }) => {
      setCookie('token', response.token);
      setCookie('username', username);
      return this.getUserByUsername(username).pipe(map(user => {
        this.user = user;
        this.isAuthenticatedChanged.emit('online');
      }));
    }));
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

  getUserByUsername(username: string) {
    return this.http.get(this.apiUrl + `/api/user/?username=${username}`, this.requestUtils.tokenRequestOptions())
               .pipe(map((users: Array<User>) => {
                 return users[0];
               }));
  }
}
