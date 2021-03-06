import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../models/user.model";
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, @Inject('BASE_API_URL') private baseUrl: string) { }

  load(clients: boolean) {
    return this.http.get(this.baseUrl + "/auth/users?clients=" + clients).pipe(
      map((data: any) => data.map((item: any) => this.createUserFormObject(item))),
    );
  }

  create(user: any, clients: boolean) {
    return this.http.post(this.baseUrl + "/auth/users?clients=" + clients, user);
  }

  loadById(id: string) {
    return this.http.get(this.baseUrl + "/auth/users/" + id).pipe(
      map((data: any) =>  this.createUserFormObject(data)),
    );
  }

  delete(id: string) {
    return this.http.delete(this.baseUrl + "/auth/users/" + id);
  }

  loadProfile() {
    return this.http.get(this.baseUrl + "/auth/profile").pipe(
      map((data: any) =>  this.createUserFormObject(data)),
    );
  }

  changePassword(req: any) {
    return this.http.put(this.baseUrl + "/auth/profile/change-password", req);
  }

  createUserFormObject(item: any) {
    return new User(item.id, item.username, item.email, item.fullName, item.roles, item.jmbg, item.address);
  }
}
