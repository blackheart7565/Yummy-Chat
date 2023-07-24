import {ApiError} from "../error/ApiError.js";

export const errorHandler = (err, req, res) => {
    if (err instanceof ApiError) {
        return res.status(err.status)
            .json({message: err.message});
    }
    return res.status(500)
        .json({message: 'Непридвиденная ошибка!'});
}