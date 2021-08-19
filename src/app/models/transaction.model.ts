import {Person} from "./person.model";

export class Transaction {
  id: string;
  sender: Person;
  recipient: Person;
  transactionDescription: string;
  transactionCode: number;
  identifier: string;
  amount: number;
  transactionTime: string;


  constructor(id: string, sender: Person, recipient: Person, transactionDescription: string, transactionCode: number, identifier: string, amount: number, transactionTime: string) {
    this.id = id;
    this.sender = sender;
    this.recipient = recipient;
    this.transactionDescription = transactionDescription;
    this.transactionCode = transactionCode;
    this.identifier = identifier;
    this.amount = amount;
    this.transactionTime = transactionTime;
  }

}
