import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { getCookie } from './request-utils';

@Injectable({
  providedIn: 'root'
})
export class RequestUtilsService {
  token: string;
  constructor() {
    this.token = getCookie('token');
  }

  requestOptions() {
    const headers = new HttpHeaders({
                                      'content-type': 'application/json',
                                      'accept': 'application/json;q=0.9,*/*;q=0.8',
                                    });
    return {
      headers: headers,
      withCredentials: true,
    };
  }

  tokenRequestOptions() {
    if (!this.token) {
      throw new Error('No token, user is not authenticated');
    }
    const headers = new HttpHeaders({
                                  'content-type': 'application/json',
                                  'accept': 'application/json;q=0.9,*/*;q=0.8',
                                  'authorization': 'JWT ' + this.token,
                                });
    return {
      headers: headers,
      withCredentials: true,
    };
  }
}
