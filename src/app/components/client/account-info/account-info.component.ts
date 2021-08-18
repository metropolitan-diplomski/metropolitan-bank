import { Component, OnInit } from '@angular/core';
import {Account} from "../../../models/account.model";
import {ActivatedRoute} from "@angular/router";
import {AccountService} from "../../../services/account.service";

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {
  // @ts-ignore
  id: string;
  // @ts-ignore
  account: Account;

  constructor(private route: ActivatedRoute, private accountService: AccountService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.loadAccount();
    });
  }

  loadAccount() {
    this.accountService.loadById(this.id).subscribe(data => {
      this.account = data;
    });
  }

}
