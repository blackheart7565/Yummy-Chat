import {Router} from "express";
import messageController from "../controllers/messageController.js";

const messageRouter = new Router();

messageRouter.post('/', messageController.create);
messageRouter.get('/', messageController.all);

export {messageRouter};