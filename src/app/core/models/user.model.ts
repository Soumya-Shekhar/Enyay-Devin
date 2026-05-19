export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: string[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginRequest {
  userNameOrEmailAddress: string;
  password: string;
  rememberClient: boolean;
}

export interface LoginResponse {
  result: {
    accessToken: string;
    encryptedAccessToken: string;
    expireInSeconds: number;
    userId: number;
  };
  success: boolean;
}

export interface AuthToken {
  accessToken: string;
  encryptedAccessToken: string;
  expireInSeconds: number;
  userId: number;
}
