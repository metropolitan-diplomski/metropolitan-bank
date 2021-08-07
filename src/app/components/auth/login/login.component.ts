import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { username, password } = this.form;

    // this.authService.login(username, password).subscribe(
    //   data => {
    //     this.tokenService.saveToken(data.token);
    //     this.tokenService.saveUser(data);
    //
    //     this.isLoginFailed = false;
    //     this.isLoggedIn = true;
    //     this.roles = this.tokenService.getUser().roles;
    //     if(this.roles.includes('ROLE_SYSTEM_ADMIN')) {
    //       this.router.navigate(['/admin/users']);
    //     } else if (this.roles.includes('ROLE_ADMIN')) {
    //       this.router.navigate(['/airadmin/dashboard']);
    //     } else {
    //       this.router.navigate(['/user/profile']);
    //     }
    //   },
    //   err => {
    //     this.errorMessage = "Login failed";
    //     this.isLoginFailed = true;
    //   }
    // );
  }

  reloadPage(): void {
    window.location.reload();
  }

}
