import { Router } from "express";
import authController from "./auth/auth.controller";
import postsController from "./posts";
import homePostsController from "./posts/homePage/homePosts.controller";

export const controllers = Router();

controllers.use(homePostsController);
controllers.use("/auth", authController);
controllers.use("/posts", postsController);
