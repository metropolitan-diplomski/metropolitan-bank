import { Component, OnInit } from '@angular/core';
import {Transaction} from "../../../models/transaction.model";
import {ActivatedRoute} from "@angular/router";
import {TransactionService} from "../../../services/transaction.service";

@Component({
  selector: 'app-transaction-info',
  templateUrl: './transaction-info.component.html',
  styleUrls: ['./transaction-info.component.css']
})
export class TransactionInfoComponent implements OnInit {

  id: string;
  transaction: Transaction;

  constructor(private route: ActivatedRoute, private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.transactionService.loadById(this.id).subscribe(data => {
        // this.transaction = data;

        console.log(data)
      });
    });
  }

}
