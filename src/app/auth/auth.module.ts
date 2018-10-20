import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {AuthComponent} from './auth.component';
import {LoginComponent} from './login/login.component';
import {Log} from '@angular/core/testing/src/logger';
import {UserService} from '../services/user.service';
import {RequestUtilsService} from '../services/request-utils.service';
import {RegisterComponent} from './register/register.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: AuthComponent
            },
            {
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'register',
                component: RegisterComponent
            }
        ])
    ],
    providers: [
        UserService,
        RequestUtilsService,
    ],
    declarations: [AuthComponent, LoginComponent, RegisterComponent]
})
export class AuthPageModule {
}
