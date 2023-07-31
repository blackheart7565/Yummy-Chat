import {Router} from "express";
import {userRouter} from "./userRouter.js";
import {channelRouter} from "./channelRouter.js";
import {messageRouter} from "./messageRouter.js";
const router = new Router();

router.use('/user', userRouter);
router.use('/channel', channelRouter);
router.use('/message', messageRouter);

export {router};