import { Router } from "express";
import { authenticator } from "../../middlewares/authenticator.middleware";
import commentsController from "../comments/comments.controller";
import likesController from "../likes/likes.controller";
import backEndPostsController from "./back-end/backendPosts.controller";
import frontEndPostsController from "./front-end/frontendPosts.controller";

const postsController = Router();

postsController.use("/front-end", frontEndPostsController);
postsController.use("/back-end", backEndPostsController);

// 로그인 이후에 댓글, 좋아요 기능 오픈

postsController.use(
  "/front-end/:postId/comments",
  authenticator,
  commentsController
);
postsController.use("/front-end", authenticator, likesController);

postsController.use(
  "/back-end/:postId/comments",
  authenticator,
  commentsController
);
postsController.use("/back-end", authenticator, likesController);

export default postsController;
