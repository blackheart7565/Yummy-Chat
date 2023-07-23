import {Router} from "express";
import channelController from "../controllers/channelController.js";

const channelRouter = new Router();

channelRouter.post('/', channelController.create);
channelRouter.get('/', channelController.getAll);
channelRouter.get('/:id', channelController.getOne);

export {channelRouter};