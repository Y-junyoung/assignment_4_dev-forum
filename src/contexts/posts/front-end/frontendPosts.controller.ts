// posts.controller.ts
import { Router } from "express";
import { authenticator } from "../../../middlewares/authenticator.middleware";
import frontendPostsService from "./frontendPosts.service";

const frontEndPostsController = Router();

frontEndPostsController.get("/", frontendPostsService.getPosts);
frontEndPostsController.get("/:postId", frontendPostsService.getPost);

// 로그인 인증 이후에 작성, 업데이트, 삭제 가능
frontEndPostsController.post(
  "/",
  authenticator,
  frontendPostsService.createPost
);
frontEndPostsController.put(
  "/:postId",
  authenticator,
  frontendPostsService.updatePost
);
frontEndPostsController.delete(
  "/:postId",
  authenticator,
  frontendPostsService.deletePost
);

export default frontEndPostsController;
