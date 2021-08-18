import {Component, Input, OnInit} from '@angular/core';
import {TransactionService} from "../../../services/transaction.service";
import {Transaction} from "../../../models/transaction.model";

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  @Input()
  id: any = '';
  @Input()
  account: boolean = false;
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    if (this.account) {
      this.transactionService.loadTransactionsByAccount(this.id).subscribe(data => {
        this.transactions = data.reverse();
      });
    } else {
      this.transactionService.loadTransactionsByUser(this.id).subscribe(data => {
        this.transactions = data.reverse();
      });
    }
  }

  isIncome(transaction: Transaction): boolean {
    if (this.account) {
      if (transaction.sender.accountNumber == this.id) {
        return false;
      }
      if (transaction.recipient.accountNumber == this.id) {
        return true
      }
    } else {
      if (transaction.sender.userId == this.id) {
        return false;
      } else {
        return true;
      }
    }

    return true;
  }
}
