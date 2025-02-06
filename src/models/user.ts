// src/models/user.ts
export class User {
  id?: number;
  username: string;
  passwordHash: string;
  role: 'admin' | 'operator';

  constructor(username: string, passwordHash: string, role: 'admin' | 'operator' = 'operator', id?: number) {
    this.username = username;
    this.passwordHash = passwordHash;
    this.role = role;
    this.id = id;
  }
}
