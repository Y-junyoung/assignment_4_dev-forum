import { RequestHandler } from "express";
import prismaClient from "../../prisma/client.prisma";

const getComments: RequestHandler<{ postId: string }> = async (req, res) => {
  const postId = Number(req.params.postId);

  try {
    const comments = await prismaClient.comment.findMany({
      where: { postId },
      orderBy: { createAt: "desc" },
    });

    res.json(comments);
  } catch (e) {
    throw e;
  }
};

const updateComment: RequestHandler<{ commentId: string }> = async (
  req,
  res
) => {
  const commentId = Number(req.params.commentId);
  const { content } = req.body;

  try {
    const updatedComment = await prismaClient.comment.update({
      where: { id: commentId },
      data: { content },
    });

    res.json(updatedComment);
  } catch (e) {
    throw e;
  }
};

const deleteComment: RequestHandler<{ commentId: string }> = async (
  req,
  res
) => {
  const commentId = Number(req.params.commentId);

  try {
    await prismaClient.comment.delete({ where: { id: commentId } });

    res.json("댓글이 정상적으로 삭제되었습니다.");
  } catch (e) {
    throw e;
  }
};

const createComment: RequestHandler<{ postId: string }> = async (req, res) => {
  const postId = Number(req.params.postId);
  const { content } = req.body;

  try {
    // 로그인한 사용자 확인
    const user = req.user;
    if (!user) return res.json("로그인 후 이용하세요!");

    const newComment = await prismaClient.comment.create({
      data: { content, userId: user.id, postId },
    });

    res.json(newComment);
  } catch (e) {
    throw e;
  }
};

const commentsService = {
  getComments,
  updateComment,
  deleteComment,
  createComment,
};

export default commentsService;
