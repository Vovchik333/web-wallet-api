import { Router } from "express";
import UserController from "./UserController";

const router = Router();
const userController = new UserController();

router.route('/:id')
    .get(userController.getOne)
    .delete(userController.deleteOne);
router.route('/')
    .post(userController.create)
    .put(userController.updateOne);

export default router;