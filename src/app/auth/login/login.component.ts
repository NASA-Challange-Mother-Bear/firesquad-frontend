import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { catchError } from 'rxjs/operators';
import { empty, Observable, EMPTY } from 'rxjs';
import { Router } from '@angular/router';

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
    public userService: UserService,
    public router: Router) {
  }

  ngOnInit() {
  }

  loginForm() {
    this.userService.login(this.username, this.password)
      .then((user) => {
        console.log(user);
        this.router.navigate(['home']);
      })
      .catch((error) => {
        console.log(error);
        this.error = error;
      });
    ;
  }

}
