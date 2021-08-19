import { Component, OnInit } from '@angular/core';
import {AccountService} from "../../../services/account.service";
import {TransactionService} from "../../../services/transaction.service";
import {Account} from "../../../models/account.model";
import {TokenService} from "../../../services/token.service";
import {Transaction} from "../../../models/transaction.model";
import {Person} from "../../../models/person.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.css']
})
export class CreateTransactionComponent implements OnInit {
  accounts: Account[] = [];
  // @ts-ignore
  selectedAccount: Account;
  form: any = {
    accountNumber: null,
    fullName: null,
    address: null,
    transactionDescription: null,
    transactionCode: null,
    identifier: null,
    amount: null
  }

  constructor(private accountService: AccountService,
              private transactionService: TransactionService,
              private tokenService: TokenService,
              private route: Router) { }

  ngOnInit(): void {
    this.accountService.load(this.tokenService.getUser().id).subscribe(data => {
      this.accounts = data;
    });
  }

  onSubmit(): void {
    if (this.selectedAccount != null) {
      if (this.selectedAccount.balance < this.form.amount) {
        alert("Not enough funds");
      } else {
        let transaction = new Transaction(
          null,
          new Person(Number(this.selectedAccount.accountNumber), this.tokenService.getUser().fullName, this.tokenService.getUser().address, null),
          new Person(this.form.accountNumber, this.form.fullName, this.form.address, null),
          this.form.transactionDescription,
          this.form.transactionCode,
          this.form.identifier,
          this.form.amount,
          null
        );

        this.transactionService.createTransaction(transaction).subscribe(data => {
          this.route.navigate(['/client/account', this.selectedAccount.id])
        })
      }
    } else {
      alert("Select account")
    }
  }

}
