import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../../config";
import prismaClient from "../../prisma/client.prisma";

class AuthService {
  async signUp(req: Request, res: Response, next: NextFunction) {
    const { email, nickname, password } = req.body;

    try {
      // 이메일(id) 중복 확인
      const overlappedEmail = await prismaClient.user.findUnique({
        where: { email },
      });
      if (overlappedEmail !== null) return res.json("email이 중복입니다.");

      // 닉네임 중복 확인
      const overlappedNickname = await prismaClient.user.findUnique({
        where: { nickname },
      });

      if (overlappedNickname !== null) return res.json("닉네임이 중복입니다.");

      // 중복이 없으면 회원가입 진행
      const encryptedPassword = await bcrypt.hash(password, 12);

      const newUser: User = await prismaClient.user.create({
        data: { email, nickname, encryptedPassword },
      });

      res.json("회원가입에 성공했습니다!");
    } catch (e) {
      throw e;
    }
  }

  async logIn(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    try {
      // 이메일(id) 정보 조회
      const user = await prismaClient.user.findUnique({
        where: { email },
      });
      if (user === null) return res.json("사용자 정보가 없습니다!");

      // 비밀번호 비교
      const isVerified = await bcrypt.compare(password, user.encryptedPassword);
      if (!isVerified) return res.json("비밀번호가 틀렸습니다!");

      const accessToken = jwt.sign({ email }, JWT_SECRET_KEY, {
        subject: email,
      });

      res.json(`로그인 성공! 엑세스토큰입니다.[${accessToken}]`);
    } catch (e) {
      throw e;
    }
  }
}

const authService = new AuthService();

export default authService;
