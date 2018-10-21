
import {Component, Input, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import {catchError} from 'rxjs/operators';
import {empty, Observable, EMPTY} from 'rxjs';
import {Router} from '@angular/router';


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


    onRegister() {
        if (this.username && this.password && this.retype_password && this.email) {
            console.log('go register');
            console.log(this.username, this.password, this.retype_password, this.email);
            console.log(this.password === this.retype_password);
            if (this.password === this.retype_password) {

                this.userService.register(this.username, this.email, this.password)
                    .then((user) => {
                        this.router.navigate(['home']);
                    })
                    .catch((error) => {
                        console.log(error);
                        this.error = error;
                    });
            }

        }

    }

    ngOnInit(): void {
    }
}
