import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config";
import prismaClient from "../prisma/client.prisma";

export async function authenticator(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const accessToken = req.headers.authorization?.split("Bearer ")[1];
  if (!accessToken) {
    return res.status(401).json({ error: "엑세스 토큰이 없습니다." });
  }

  try {
    const { sub: id } = jwt.verify(accessToken, JWT_SECRET_KEY);
    const emailId = String(id);

    const user = await prismaClient.user.findUnique({
      where: { email: emailId },
    });

    if (!user) {
      return res.status(404).json({ error: "유저를 찾지 못했습니다." });
    }

    req.user = user;
  } catch (error) {
    return res.status(401).json({ error: "엑세스토큰이 유효하지 않습니다." });
  }

  next();
}
