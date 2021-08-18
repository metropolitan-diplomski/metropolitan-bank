export class Person {
  accountNumber: number;
  fullName: string;
  address: string;
  userId: string;


  constructor(accountNumber: number, fullName: string, address: string, userId: string) {
    this.accountNumber = accountNumber;
    this.fullName = fullName;
    this.address = address;
    this.userId = userId;
  }
}
