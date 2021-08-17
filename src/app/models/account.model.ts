export class Account {
  id: string;
  name: string;
  accountNumber: string;
  userId: string;
  userFullName: string;
  currency: string;
  balance: number;


  constructor(id: string, name: string, accountNumber: string, userId: string, userFullName: string, currency: string, balance: number) {
    this.id = id;
    this.name = name;
    this.accountNumber = accountNumber;
    this.userId = userId;
    this.userFullName = userFullName;
    this.currency = currency;
    this.balance = balance;
  }
}
