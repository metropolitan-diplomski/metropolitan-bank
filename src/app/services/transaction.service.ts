import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Transaction} from "../models/transaction.model";
import {Person} from "../models/person.model";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient, @Inject('BASE_API_URL') private baseUrl: string) { }

  loadTransactionsByAccount(accountNumber: any) {
    return this.http.get(this.baseUrl + "/transaction/trs/search?accountNumber=" + accountNumber).pipe(
      map((data: any) => data.map((item: any) => this.createTransactionFromItem(item))),
    );
  }

  loadTransactionsByUser(userId: any) {
    return this.http.get(this.baseUrl + "/transaction/trs/search?userId=" + userId).pipe(
      map((data: any) => data.map((item: any) => this.createTransactionFromItem(item))),
    );
  }

  loadById(id: string) {
    return this.http.get(this.baseUrl + "/transaction/trs/by-id/" + id).pipe(
      map((data: any) =>  this.createTransaction(data)),
    );
  }

  createTransaction(transaction: Transaction) {
    return this.http.post(this.baseUrl + "/transaction/trs/create", transaction);
  }

  createTransactionFromItem(item: any) {
    return new Transaction(
      item.id,
      new Person(item.sender.accountNumber, item.sender.fullName, item.sender.address, item.sender.userId),
      new Person(item.recipient.accountNumber, item.recipient.fullName, item.recipient.address, item.recipient.userId),
      item.transactionDescription,
      item.transactionCode,
      item.identifier,
      item.amount,
      item.transactionTime
    );
  }
}
