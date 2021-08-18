import { Component, OnInit } from '@angular/core';
import {Account} from "../../../models/account.model";
import {AccountService} from "../../../services/account.service";
import {TokenService} from "../../../services/token.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  // @ts-ignore
  accounts: Account[];

  constructor(private accountService: AccountService, private tokenService: TokenService) { }

  ngOnInit(): void {
    this.accountService.load(this.tokenService.getUser().id).subscribe(data => {
      this.accounts = data;
    });
  }

}
