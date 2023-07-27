import {Router} from "express";
import channelController from "../controllers/channelController.js";

const channelRouter = new Router();

channelRouter.post('/', channelController.create);
channelRouter.get('/', channelController.getUserChannel);
channelRouter.get('/:id', channelController.getOne);

export {channelRouter};