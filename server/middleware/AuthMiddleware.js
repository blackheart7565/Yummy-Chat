import {ApiError} from "../error/ApiError.js";
import jwt from 'jsonwebtoken';
import {SECRET_KEY} from "../const-vars.js";

export const authMiddleware = (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    }
    try {
        const token = req.headers.authorization.split(" ")[1];

        if (!token) {
            return next(ApiError.unauthorized('Не авторизивораный'))
        }
        req.user = jwt.verify(token, SECRET_KEY);
        next();
    } catch (e) {
        next(ApiError.unauthorized('Не авторизивораный'))
    }
}