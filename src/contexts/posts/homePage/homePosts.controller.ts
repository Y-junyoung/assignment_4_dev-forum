// posts.controller.ts
import { Router } from "express";
import homePostsService from "./homePosts.service";

const homePostsController = Router();

homePostsController.get("/", homePostsService.getPosts);

export default homePostsController;
