import { Router } from "express";
import * as userController from "../controllers/user.controller";
import * as authenticationController from "../controllers/authentication.controller";

const router = Router();

router.use('/registration', userController.registerUser);
router.use('/login', authenticationController.loginUser);

export default router;