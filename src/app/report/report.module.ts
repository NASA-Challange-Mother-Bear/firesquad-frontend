import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportComponent} from './report.component';
import {UserService} from '../services/user.service';
import {RequestUtilsService} from '../services/request-utils.service';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: ReportComponent
            }
        ])
    ],
    providers: [
        UserService,
        RequestUtilsService,
    ],
    declarations: [ReportComponent]
})
export class ReportModule {
}
