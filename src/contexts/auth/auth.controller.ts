import { Router } from "express";
import authService from "./auth.service";

const authController = Router();

authController.use("/sign-up", authService.signUp);
authController.use("/log-in", authService.logIn);

export default authController;
