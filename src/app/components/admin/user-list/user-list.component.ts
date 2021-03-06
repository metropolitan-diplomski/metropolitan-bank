import {Component, Input, OnInit} from '@angular/core';
import {User} from "../../../models/user.model";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input()
  clients: boolean = true
  users: User[] = [];
  userText = "clients";
  buttonText = "client";
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.load();
    if (this.clients) {
      this.userText = "clients";
      this.buttonText = "client";
    } else {
      this.userText = "employees"
      this.buttonText = "employee"
    }
  }

  load() {
    this.userService.load(this.clients).subscribe(data => {
      this.users = data;
    });
  }

  delete(id: string) {
    this.userService.delete(id).subscribe(data => {
      this.load();
    })
  }

}
