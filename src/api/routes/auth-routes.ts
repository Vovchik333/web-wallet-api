import { Router } from "express";
import UserController from "../controllers/UserController";
import { loginUser } from "../controllers/AuthenticationController";

const router = Router();
const userController = new UserController();

router.use('/registration', userController.registerUser);
router.use('/login', loginUser);

export default router;