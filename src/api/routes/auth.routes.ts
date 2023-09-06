import { Router } from "express";
import * as userController from "../controllers/user.controller";
import * as authenticationController from "../controllers/authentication.controller";
import { userSchema } from "../../validation/schemes/user.schema";
import { validate } from "../../validation/validator";
import { loginSchema } from "../../validation/schemes/login.schema";

const router = Router();

router.use('/registration', validate(userSchema), userController.registerUser);
router.use('/login', validate(loginSchema), authenticationController.loginUser);

export default router;