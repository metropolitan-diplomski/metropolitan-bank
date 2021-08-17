import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs/operators";
import {User} from "../models/user.model";
import {Account} from "../models/account.model";

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient, @Inject('BASE_API_URL') private baseUrl: string) { }

  load(userId: string) {
    return this.http.get(this.baseUrl + "/account/user/" + userId).pipe(
      map((data: any) => data.map((item: any) => this.createAccountFormObject(item))),
    );
  }

  loadById(id: string) {
    return this.http.get(this.baseUrl + "/account/" + id).pipe(
      map((data: any) =>  this.createAccountFormObject(data)),
    );
  }

  create(account: any) {
    return this.http.post(this.baseUrl + "/account/", account);
  }

  createAccountFormObject(item: any) {
    return new Account(
      item.id,
      item.name,
      item.accountNumber,
      item.userId,
      item.userFullName,
      item.currency,
      item.balance);
  }
}
