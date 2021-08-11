import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {
  form: any = {
    username: null,
    password: null,
    email: null,
    fullName: null
  };
  errorMessage = '';

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.userService.create(this.form, false).subscribe(data=> {
        this.router.navigate(['/admin/employees']);
      },
      err => {
        this.errorMessage = err.errorMessage;
      });
  }

}
