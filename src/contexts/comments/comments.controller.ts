// comments.controller.ts
import { Router } from "express";
import commentsService from "./comments.service";

const commentsController = Router();

commentsController.get("/", commentsService.getComments);
commentsController.post("/", commentsService.createComment);
commentsController.put("/:commentId", commentsService.updateComment);
commentsController.delete("/:commentId", commentsService.deleteComment);

export default commentsController;
