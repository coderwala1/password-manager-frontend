export interface ILoginDto {
  email: string;
  pass: string;
}

// * Response object
export interface ICurrentUser {
  id: string;
  fullName: string;
  email: string;
  gender: string;
  avatar?: string;
  isEmailVerified: boolean;
  lastLoggedIn: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IMasterPassChangeDto {
  arr: {
    _id: string;
    password: string;
  }[];
  user: {
    oldPass: string;
    pass: string;
  };
}
