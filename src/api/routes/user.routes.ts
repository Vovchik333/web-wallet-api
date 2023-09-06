import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { authorization } from "../../auth/authorization";
import { validate } from "../../validation/validator";
import { userSchema } from "../../validation/schemes/user.schema";

const router = Router();

router.route('/:id')
    .get(authorization, userController.getUser)
    .delete(authorization, userController.deleteUser);
router.route('/')
    .put(validate(userSchema), authorization, userController.updateUser);

export default router;