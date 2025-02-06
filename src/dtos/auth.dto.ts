export interface RegisterDTO {
  username: string;
  password: string;
  role?: 'admin' | 'operator';
}

export interface LoginDTO {
  username: string;
  password: string;
}
