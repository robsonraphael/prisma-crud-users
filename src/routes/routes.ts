import { Router, Request, Response } from "express";

// services
import { CreateUser } from "../services/CreateUser";
import { GetAllUsers } from "../services/GetAllUsers";
import { GetUser } from "../services/GetUser";
import { UpdatePassword } from "../services/UpdatePassword";
import { DeleteUser } from "../services/DeleteUser";

const router = Router();

// Create User
router.post("/register", CreateUser);

// Find all
router.get("/search/user/all", GetAllUsers);

// Find by id
router.get("/search/user/:id", GetUser);

// Update Password
router.put("/user/update/password/:id", UpdatePassword);

// Delete User
router.delete("/user/delete/:id", DeleteUser);

export { router };
