import {Router} from "express";
import channelController from "../controllers/channelController.js";

const channelRouter = new Router();

channelRouter.post('/', channelController.create);
channelRouter.post('/connect', channelController.connectUserToChannel);
channelRouter.get('/', channelController.getUserChannel);
channelRouter.get('/all', channelController.getAll);
channelRouter.get('/:id', channelController.getOne);

export {channelRouter};