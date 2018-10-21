import {Component, OnInit} from '@angular/core';
import {User, UserService} from '../services/user.service';
import {ReportService} from '../services/report.service';
import {RequestUtilsService} from '../services/request-utils.service';
import {getCookie} from '../services/request-utils';

@Component({
    selector: 'app-report',
    templateUrl: './report.component.html',
    styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
    public reports = null;

    constructor(public userSerice: UserService,
                public reportSerice: ReportService,
                public requestUtils: RequestUtilsService) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.reportSerice.getReportbyUser(this.userSerice.user.id).then((data) => {
                this.reports = data;
                console.log(this.reports);
            });
        });

    }

    parseDate(timestamp: string) {

        return new Date(Date.parse(timestamp)).toLocaleString('ro');
    }

    parseCoord(coord: any) {
        return coord.toFixed(3);
    }

}
