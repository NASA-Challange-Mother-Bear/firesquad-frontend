import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {catchError} from 'rxjs/operators';
import {empty, Observable, EMPTY} from 'rxjs';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    @Input() public username = null;
    @Input() public password = null;
    error: string;

    constructor(
        public userService: UserService) {
    }

    ngOnInit() {
    }

    loginForm() {
        this.userService.login(this.username, this.password)
            .pipe(catchError((error, obs) => {
                console.log(error);
                if (!error) {
                    return obs;
                } else {
                    this.error = error;
                    return EMPTY;
                }
            }))
            .subscribe((user) => {
                this.error = undefined;
                console.log('autentificat');
            });
    }

}
