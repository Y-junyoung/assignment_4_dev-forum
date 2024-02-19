declare namespace Express {
  interface Request {
    user?: {
      id: number;
      email: string;
      nickname: string;
      encryptedPassword: string;
      createdAt: Date;
    };
  }
}
