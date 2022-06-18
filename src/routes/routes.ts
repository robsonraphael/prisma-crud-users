import { Router } from "express";
import { CreateUserController } from "../controller/CreateUserController";

const router = Router();

const createUser = new CreateUserController();

router.get("/", (req, res) => {
  res.end("<h1>Home Page</h1>");
});
router.post("/user", createUser.handle);


export { router };
