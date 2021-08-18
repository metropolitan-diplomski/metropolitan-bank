import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {TokenService} from "../../../services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenService.saveToken(data.token);
        this.tokenService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenService.getUser().roles;
        if(this.roles.includes('ROLE_ADMIN')) {
          this.router.navigate(['/admin/dashboard']);
        } else if (this.roles.includes('ROLE_USER')) {
          this.router.navigate(['/client/dashboard']);
        } else {
          this.router.navigate(['/login']);
        }
      },
      err => {
        this.errorMessage = "Login failed";
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
