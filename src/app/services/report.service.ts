import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { RequestUtilsService } from './request-utils.service';
import { GeoJSON, geoJsonToModel } from './request-utils';
import { map } from 'rxjs/operators';
import { UserService } from './user.service';

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

  postReport(type: ReportType, geolocation: Point, photo: string) {
    this.http.post(this.apiUrl + '/api/report_post/', {
      user: this.userService.user.id,
      geolocation,
      type: reportTypeMapping[type],
      photo
    }, this.requestUtil.tokenRequestOptions()).toPromise().then((report: GeoJSON) => {
      return geoJsonToModel<Report>(report);
    });
  }

}
