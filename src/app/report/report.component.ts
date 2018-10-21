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
    public reportsForestFire = null;
    public reportsHazardFire = null;
    public page = 0;

    constructor(public userSerice: UserService,
                public reportSerice: ReportService,
                public requestUtils: RequestUtilsService) {
    }

    ngOnInit() {
        setTimeout(() => {
            this.reportSerice.getReportbyUser(this.userSerice.user.id, 0).then((data) => {
                this.reportsForestFire = data;
                console.log(this.reportsForestFire);
            });
        });
        setTimeout(() => {
            this.reportSerice.getReportbyUser(this.userSerice.user.id, 1).then((data) => {
                this.reportsHazardFire = data;
                console.log(this.reportsHazardFire);
            });
        });

    }

    parseDate(timestamp: string) {

        return new Date(Date.parse(timestamp)).toLocaleString('ro');
    }

    parseCoord(coord: any) {
        return coord.toFixed(3);
    }

    getColor(status) {
        return status === 0 ? 'processing' : (status === 1 ? 'rejected' : 'accepted');
    }

    getIcon(status) {
        return status === 0 ? 'infinite' : (status === 1 ? 'close' : 'checkmark');
    }

    onChangeScreen(option: string) {
        if (option === 'fire') {
            this.page = 0;
        }
        if (option === 'hazard') {
            this.page = 1;
        }
    }
}
