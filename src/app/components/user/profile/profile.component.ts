import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;

  form: any = {
    oldPassword: null,
    newPassword: null
  }

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.loadProfile().subscribe(data => {
      this.user = data;
    })
  }

  onSubmit(): void {
    this.userService.changePassword(this.form).subscribe(data => {
      this.form.oldPassword = "";
      this.form.newPassword = "";
      alert("Password changes successfully");
    },
      err => {
      console.log(err);
        alert(err.error.message);
      });
  }

}
