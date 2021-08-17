import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../services/user.service";
import {User} from "../../../models/user.model";
import {Account} from "../../../models/account.model";
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-client-info',
  templateUrl: './client-info.component.html',
  styleUrls: ['./client-info.component.css']
})
export class ClientInfoComponent implements OnInit {
  // @ts-ignore
  id: string;
  // @ts-ignore
  user: User;
  // @ts-ignore
  accounts: Account[];
  form: any = {
    userId: null,
    name: null,
    currency: null
  }

  currencies =  ["RSD", "EUR", "USD", "CAD", "AUD", "CHF"]

  constructor(private route: ActivatedRoute, private userService: UserService, private accountService: AccountService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];

      this.userService.loadById(this.id).subscribe(data => {
        this.user = data;
      });

      this.loadAccounts();
    });
  }

  loadAccounts() {
    this.accountService.load(this.id).subscribe(data => {
      this.accounts = data;
    });
  }

  onSubmit(): void {
    this.form.userId = this.id;
    this.accountService.create(this.form).subscribe(data => {
      this.loadAccounts();
      // @ts-ignore
      document.getElementById('closeModalButton').click();
    });
  }
}
