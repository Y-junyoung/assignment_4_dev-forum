// posts.controller.ts
import { Router } from "express";
import { authenticator } from "../../../middlewares/authenticator.middleware";
import backendPostsService from "./backendPosts.service";

const backEndPostsController = Router();

backEndPostsController.get("/", backendPostsService.getPosts);
backEndPostsController.get("/:postId", backendPostsService.getPost);

// 로그인 인증 이후에 작성, 세부내용확인, 업데이트, 삭제 가능

backEndPostsController.post("/", authenticator, backendPostsService.createPost);
backEndPostsController.put(
  "/:postId",
  authenticator,
  backendPostsService.updatePost
);
backEndPostsController.delete(
  "/:postId",
  authenticator,
  backendPostsService.deletePost
);

export default backEndPostsController;
