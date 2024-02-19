import { RequestHandler } from "express";
import prismaClient from "../../../prisma/client.prisma";

const getPosts: RequestHandler = async (req, res) => {
  try {
    const homePosts = await prismaClient.post.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    res.json(homePosts);
  } catch (e) {
    throw e;
  }
};

const homePostsService = {
  getPosts,
};

export default homePostsService;
