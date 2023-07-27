import {Router} from "express";
import UserController from "../controllers/userController.js";
import {authMiddleware} from "../middleware/AuthMiddleware.js";
const userRouter = new Router();

userRouter.post('/registration', UserController.registration);
userRouter.post('/login', UserController.login);
userRouter.get('/auth', authMiddleware, UserController.check);


userRouter.get('/', UserController.getAll);
userRouter.get('/:id', UserController.getOne);

export {userRouter};