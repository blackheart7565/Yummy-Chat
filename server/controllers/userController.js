import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {ApiError} from "../error/ApiError.js";
import {SECRET_KEY} from "../const-vars.js";
import {Users} from "../model/Users.js";

const generateJwt = (id, avatar, username, email, phone) => {
    return jwt.sign(
        {id, avatar, username, email, phone}
        , SECRET_KEY
        , {
            expiresIn: '24h'
        }
    );
}

class UserController {

    async registration(req, res, next) {
        const {avatar, username, email, phone, password} = req.body;

        if (!email || !password) {
            return next(ApiError.badRequest('Некорректний email или password'));
        }

        const candidate = await Users.findOne({
            where: {email}
        });

        if (candidate) {
            return next(ApiError.badRequest(`Пользователь с таким email уже существует!`));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await Users.create({
            avatar
            , username
            , email
            , phone
            , password: hashPassword
        });

        const token = generateJwt(user.id, user.avatar, user.username, user.email, user.phone)
        return res.json({token});
    }

    async login(req, res, next) {
        const {email, password} = req.body;
        const user = await Users.findOne({where: {email}})
        if (!user) {
            return next(ApiError.badRequest(`Пользователь не найден!`));
        }
        const comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return next(ApiError.badRequest(`Указан неверный пароль!!`));
        }
        const token = generateJwt(user.id, user.avatar, user.username, user.email, user.phone)
        return res.json({token});
    }

    async check(req, res, next) {
        const token = generateJwt(req.user.id, req.user.avatar, req.user.username, req.user.email, req.user.phone)
        return res.json({token});
    }
}

export default new UserController();
