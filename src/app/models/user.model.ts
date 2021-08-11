export class User {
  username: string
  email: string
  fullName: string
  roles: []
  jmbg: string
  address: string

  constructor(username: string, email: string, fullName: string, roles: [], jmbg: string, address: string) {
    this.username = username;
    this.email = email;
    this.fullName = fullName;
    this.roles = roles;
    this.jmbg = jmbg;
    this.address = address;
  }
}
