import { RequestHandler } from "express";
import prismaClient from "../../../prisma/client.prisma";

const getPosts: RequestHandler = async (req, res) => {
  try {
    const frontendPosts = await prismaClient.post.findMany({
      where: { boardId: 1 },
      orderBy: { createdAt: "desc" },
    });

    res.json(frontendPosts);
  } catch (e) {
    throw e;
  }
};

const getPost: RequestHandler<{ postId: string }> = async (req, res) => {
  const postId = Number(req.params.postId);

  try {
    const post = await prismaClient.post.findUnique({
      where: { id: postId, boardId: 1 },
    });
    if (!post) return res.json("포스트가 없습니다.");

    res.json(post);
  } catch (e) {
    throw e;
  }
};

const updatePost: RequestHandler<{ postId: string }> = async (req, res) => {
  const postId = Number(req.params.postId);
  const { title, content } = req.body;

  try {
    const updatedPost = await prismaClient.post.update({
      where: { id: postId, boardId: 1 },
      data: { title, content },
    });

    res.json(updatedPost);
  } catch (e) {
    throw e;
  }
};

const deletePost: RequestHandler<{ postId: string }> = async (req, res) => {
  const postId = Number(req.params.postId);

  try {
    await prismaClient.post.delete({ where: { id: postId, boardId: 1 } });

    res.json("포스트가 정상적으로 삭제되었습니다.");
  } catch (e) {
    throw e;
  }
};

const createPost: RequestHandler = async (req, res) => {
  const { title, content } = req.body;

  try {
    // 유저가 로그인 되어 있는지
    const user = req.user;
    if (!user) return res.json("로그인 후 이용하세요!");

    const newFrontendPost = await prismaClient.post.create({
      data: { title, content, userId: user.id, boardId: 1 },
    });

    res.json(newFrontendPost);
  } catch (e) {
    throw e;
  }
};

const frontendPostsService = {
  getPosts,
  getPost,
  updatePost,
  deletePost,
  createPost,
};

export default frontendPostsService;
