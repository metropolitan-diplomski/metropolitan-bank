export class User {
  username: string
  email: string
  fullName: string
  roles: []
  password: string

  constructor(username: string, email: string, fullName: string, roles: [], password: string) {
    this.username = username;
    this.email = email;
    this.fullName = fullName;
    this.roles = roles;
    this.password = password;
  }
}
