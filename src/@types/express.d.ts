declare module 'express' {
  interface Request {
    user: JwtPayload;
  }
}

interface JwtPayload {
  sub: number;
  email: string;
  role: string;
}
