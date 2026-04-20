export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponse {
 message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}