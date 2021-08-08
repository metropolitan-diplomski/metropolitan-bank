import { Component, OnInit } from '@angular/core';
import {TokenService} from "../../services/token.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  role="";
  username="";
  constructor(private tokenService: TokenService) { }

  ngOnInit(): void {
    this.role = this.tokenService.getUser().roles[0];
    this.username = this.tokenService.getUser().username;
  }

  logout() {

  }

}
