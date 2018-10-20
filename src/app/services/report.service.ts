import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RequestUtilsService } from './request-utils.service';
import { GeoJSON, geoJsonToModel, getCookie } from './request-utils';
import { map } from 'rxjs/operators';
import { User, UserService } from './user.service';

const reportTypeMapping = {
  'forest_fire': 0,
  'fire_hazard': 1
};

export type ReportType = keyof typeof reportTypeMapping;


export interface Report {
  id: number;
  geolocation: Point;
  status: valueof<typeof reportTypeMapping>;
  timestamp: string;
  type: ReportType;
  user: number;
  alert: number;
  photos: Array<string>;
}

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  apiUrl = environment.apiUrl;

  constructor(public http: HttpClient,
              public userService: UserService,
              public requestUtil: RequestUtilsService) {
  }

  postReport(type: ReportType, geolocation: Point, photos: Array<string>) {
    this.http.post(this.apiUrl + '/api/report/', {
      user: this.userService.user.id,
      geolocation,
      type,
      photos
    }, this.requestUtil.tokenRequestOptions()).pipe(map((report: GeoJSON) => {
      return geoJsonToModel<Report>(report);
    }));
  }

}
