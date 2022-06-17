import { Router } from "express";
import { CreateUserController } from "../controller/CreateUserController";

const router = Router();

const createUser = new CreateUserController();

router.post("/user", createUser.handle);

export { router };
