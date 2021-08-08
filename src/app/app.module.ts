import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/auth/login/login.component';
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RouterModule, Routes} from "@angular/router";
import {TokenService} from "./services/token.service";
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import {AuthService} from "./services/auth.service";
import {AuthInterceptor} from "./helpers/auth.interceptor";
import {environment} from "../environments/environment";
import {AuthGuard} from "./helpers/auth.guard";

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    component: MainComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_ADMIN']},
    children: [
      {
        path: 'dashboard', // child route path
        component: DashboardComponent, // child route component that the router renders
      },
    ]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: 'BASE_API_URL', useValue: environment.apiUrl },
    TokenService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
