export interface User {
  id: number;
  name: string;
  email: string;
}

export interface LoginData {
  token: string;
  user: User;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: LoginData;
}

export interface LoginRequest {
  email: string;
  password: string;
}