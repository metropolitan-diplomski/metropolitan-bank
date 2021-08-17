export class User {
  id: string;
  username: string
  email: string
  fullName: string
  roles: []
  jmbg: string
  address: string

  constructor(id: string, username: string, email: string, fullName: string, roles: [], jmbg: string, address: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.fullName = fullName;
    this.roles = roles;
    this.jmbg = jmbg;
    this.address = address;
  }
}
