interface JwtPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number;
}

declare namespace Express {
  export interface Request {
    user: JwtPayload;
  }
  export interface Response {
    user: JwtPayload;
  }
}
