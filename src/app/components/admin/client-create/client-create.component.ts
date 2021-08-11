import {Component, Input, OnInit} from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
    email: null,
    fullName: null,
    address: null,
    jmbg: null
  };
  errorMessage = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.userService.create(this.form, true).subscribe(data=> {
          this.router.navigate(['/admin/clients']);
      },
      err => {
        this.errorMessage = err.errorMessage;
      });
  }

}
