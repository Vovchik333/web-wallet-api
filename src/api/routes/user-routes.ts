import { Router } from "express";
import UserController from "../controllers/UserController";

const router = Router();
const userController = new UserController();

router.route('/:id')
    .get(userController.getUser)
    .delete(userController.deleteUser);
router.route('/')
    .post(userController.createUser)
    .put(userController.updateUser);

export default router;