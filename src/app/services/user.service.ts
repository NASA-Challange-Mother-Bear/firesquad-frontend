import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {getCookie, setCookie} from './request-utils';
import {RequestUtilsService} from './request-utils.service';
import {flatMap, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

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

    constructor(public http: HttpClient,
                public requestUtils: RequestUtilsService) {
        if (requestUtils.token) {
            this.awaitUser = this.getUserByUsername(getCookie('username')).pipe(map(user => {
                this.user = user;
                this.awaitUser = null;
            }));
        }
    }

    login(username: string, password: string) {
        console.log(this.apiUrl + '/api-token-auth/');
        return this.http.post(this.apiUrl + '/api-token-auth/', {
            username, password
        }, this.requestUtils.requestOptions()).pipe(flatMap((response: { token: string }) => {
            setCookie('token', response.token);
            this.requestUtils.token = response.token;
            setCookie('username', username);
            return this.getUserByUsername(username).pipe(map(user => {
                this.user = user;
                return user;
            }));
        }));
    }

    register(username: string, email: string, password: string) {
        console.log(this.apiUrl + '/api/register/');
        return this.http.post(this.apiUrl + '/api/register/', {
            'username': username,
            'password': password,
            'email': email
        }, this.requestUtils.requestOptions()).pipe(map((data: {
            user: User,
            token: string
        }) => {
            this.user = data.user;
            setCookie('username', this.user.username);
            this.requestUtils.token = data.token;
            setCookie('token', this.requestUtils.token);
        }));
    }

    getUserByUsername(username: string) {
        return this.http.get(this.apiUrl + `/api/user/?username=${username}`, this.requestUtils.tokenRequestOptions())
            .pipe(map((users: Array<User>) => {
                return users[0];
            }));
    }
}
