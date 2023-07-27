import {Router} from "express";
import {userRouter} from "./userRouter.js";
import {channelRouter} from "./channelRouter.js";

const router = new Router();

router.use('/user', userRouter);
router.use('/channel', channelRouter);

export {router};