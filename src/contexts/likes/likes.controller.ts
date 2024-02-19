import { Router } from "express";
import likesService from "./likes.service";

const likesController = Router();

likesController.post("/:postId/likes", likesService.createLike);
likesController.get("/:postId/likes/user/:userId", likesService.getUserLikes);
likesController.get("/:postId/likes", likesService.getPostLikes);
likesController.delete("/:postId/likes/:likeId", likesService.deleteLike);

export default likesController;
