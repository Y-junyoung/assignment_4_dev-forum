import { RequestHandler } from "express";
import prismaClient from "../../prisma/client.prisma";

const createLike: RequestHandler = async (req, res) => {
  const postId = Number(req.params.postId);

  try {
    const user = req.user;
    if (!user) return res.json("로그인 후 이용하세요!");

    const like = await prismaClient.like.create({
      data: { userId: user.id, postId },
    });
    res.json("좋아요!");
  } catch (e) {
    throw e;
  }
};

// 특정 사용자의 모든 좋아요 조회
const getUserLikes: RequestHandler<{ userId: string }> = async (req, res) => {
  const userId = Number(req.params.userId);

  try {
    const likes = await prismaClient.like.findMany({
      where: { userId },
    });
    res.json(likes);
  } catch (e) {
    throw e;
  }
};

// 특정 게시물의 모든 좋아요 조회
const getPostLikes: RequestHandler<{ postId: string }> = async (req, res) => {
  const postId = Number(req.params.postId);

  try {
    const likes = await prismaClient.like.findMany({
      where: { postId },
    });
    res.json(likes);
  } catch (e) {
    throw e;
  }
};

// 특정 좋아요 삭제
const deleteLike: RequestHandler<{ likeId: string }> = async (req, res) => {
  const likeId = Number(req.params.likeId);

  try {
    await prismaClient.like.delete({
      where: { id: likeId },
    });
    res.json("좋아요 취소 완료!");
  } catch (e) {
    throw e;
  }
};

const likesService = {
  createLike,
  deleteLike,
  getPostLikes,
  getUserLikes,
};

export default likesService;
