import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { authorization } from "../../auth/authorization";

const router = Router();

router.route('/:id')
    .get(authorization, userController.getUser)
    .delete(authorization, userController.deleteUser);
router.route('/')
    .put(authorization, userController.updateUser);

export default router;