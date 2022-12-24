import { Router } from "express";
import { UserController } from "./user.controller";

const userRouter = Router();

userRouter
  .post('/login', UserController.login)
  .post('/cadastro', UserController.cadastro)

export { userRouter };