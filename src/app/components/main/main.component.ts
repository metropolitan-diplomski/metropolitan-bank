import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  role="";
  username="";
  constructor(private tokenService: TokenService, private router: Router) { }

  ngOnInit(): void {
    this.role = this.tokenService.getUser().roles[0];
    this.username = this.tokenService.getUser().username;
  }

  logout() {
    this.tokenService.signOut();
    this.router.navigate(['/login']);
  }

}
