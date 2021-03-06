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
import { UserListComponent } from './components/admin/user-list/user-list.component';
import { ClientListComponent } from './components/admin/client-list/client-list.component';
import { EmployeeListComponent } from './components/admin/employee-list/employee-list.component';
import { ClientCreateComponent } from './components/admin/client-create/client-create.component';
import { EmployeeCreateComponent } from './components/admin/employee-create/employee-create.component';
import { ClientInfoComponent } from './components/admin/client-info/client-info.component';
import {AccountService} from "./services/account.service";
import { AccountsComponent } from './components/client/accounts/accounts.component';
import { ClientDashboardComponent } from './components/client/client-dashboard/client-dashboard.component';
import { AccountInfoComponent } from './components/client/account-info/account-info.component';
import { TransactionsComponent } from './components/client/transactions/transactions.component';
import {TransactionService} from "./services/transaction.service";
import { CreateTransactionComponent } from './components/client/create-transaction/create-transaction.component';
import { ProfileComponent } from './components/user/profile/profile.component';

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
      {
        path: 'clients', // child route path
        component: ClientListComponent, // child route component that the router renders
      },
      {
        path: 'employees', // child route path
        component: EmployeeListComponent, // child route component that the router renders
      },
      {
        path: 'client-create', // child route path
        component: ClientCreateComponent, // child route component that the router renders
      },
      {
        path: 'client-employee', // child route path
        component: EmployeeCreateComponent, // child route component that the router renders
      },
      {
        path: 'client/:id', // child route path
        component: ClientInfoComponent, // child route component that the router renders
      },
      {
        path: 'profile', // child route path
        component: ProfileComponent, // child route component that the router renders
      },
    ],
  },
  {
    path: 'client',
    component: MainComponent,
    canActivate: [AuthGuard],
    data: {roles: ['ROLE_USER']},
    children: [
      {
        path: 'dashboard', // child route path
        component: ClientDashboardComponent, // child route component that the router renders
      },
      {
        path: 'accounts', // child route path
        component: AccountsComponent, // child route component that the router renders
      },
      {
        path: 'account/:id', // child route path
        component: AccountInfoComponent, // child route component that the router renders
      },
      {
        path: 'transaction/create', // child route path
        component: CreateTransactionComponent, // child route component that the router renders
      },
      {
        path: 'profile', // child route path
        component: ProfileComponent, // child route component that the router renders
      }
    ]
  }
]

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    DashboardComponent,
    UserListComponent,
    ClientListComponent,
    EmployeeListComponent,
    ClientCreateComponent,
    EmployeeCreateComponent,
    ClientInfoComponent,
    AccountsComponent,
    ClientDashboardComponent,
    AccountInfoComponent,
    TransactionsComponent,
    CreateTransactionComponent,
    ProfileComponent
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
    AuthService,
    AccountService,
    TransactionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
