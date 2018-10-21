import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {catchError} from 'rxjs/operators';
import {empty, Observable, EMPTY} from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    @Input() public username = null;
    @Input() public password = null;
    @Input() public retype_password = null;
    @Input() public email = null;
    public error = null;


    constructor(public userService: UserService,
                public router: Router) {
    }

    ngOnInit() {
    }

    onRegister() {
        if (this.username && this.password && this.retype_password && this.email) {
            console.log('go register');
            this.userService.register(this.username, this.email, this.password).pipe(catchError((error, obs) => {
                console.log(error);
                if (!error) {
                    return obs;
                } else {
                    this.error = error;
                    return EMPTY;
                }
            }))
                .subscribe((user) => {
                    this.router.navigate(['home']);
                });
        }

    }

}
