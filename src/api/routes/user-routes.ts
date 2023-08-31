import { Router } from "express";
import UserController from "../controllers/UserController";
import { authorization } from "../../auth/authentication";

const router = Router();
const userController = new UserController();

router.route('/:id')
    .get(authorization, userController.getUser)
    .delete(authorization, userController.deleteUser);
router.route('/')
    .put(authorization, userController.updateUser);

export default router;