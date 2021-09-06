import {Component, OnInit, ViewChild} from '@angular/core';
import {Account} from "../../../models/account.model";
import {ActivatedRoute} from "@angular/router";
import {AccountService} from "../../../services/account.service";
import {Transaction} from "../../../models/transaction.model";
import {Person} from "../../../models/person.model";
import {TransactionService} from "../../../services/transaction.service";
import {TokenService} from "../../../services/token.service";
import {TransactionsComponent} from "../transactions/transactions.component";

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {
  @ViewChild(TransactionsComponent) transactionsComponent:TransactionsComponent;
  // @ts-ignore
  id: string;
  // @ts-ignore
  account: Account;
  form: any = {
    accountNumber: null,
    fullName: null,
    address: null,
    transactionDescription: null,
    transactionCode: null,
    identifier: null,
    amount: null
  }
  role: string;

  constructor(private route: ActivatedRoute,
              private accountService: AccountService,
              private transactionService: TransactionService,
              private tokenService: TokenService) { }

  ngOnInit(): void {
    this.role = this.tokenService.getUser().roles[0];
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

  onSubmit(): void {
      if (this.account.balance < this.form.amount) {
        alert("Not enough funds");
      } else {
        let transaction = new Transaction(
          null,
          new Person(Number(this.account.accountNumber), this.tokenService.getUser().fullName, this.tokenService.getUser().address, null),
          new Person(this.form.accountNumber, this.form.fullName, this.form.address, null),
          this.form.transactionDescription,
          this.form.transactionCode,
          this.form.identifier,
          this.form.amount,
          null
        );

        this.transactionService.createTransaction(transaction).subscribe(data => {
          document.getElementById('closeModalButton').click();
          this.transactionsComponent.ngOnInit();
        })
      }
  }

}
