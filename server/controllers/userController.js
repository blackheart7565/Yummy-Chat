import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {table} from "../model/model.js";
import {ApiError} from "../error/ApiError.js";
import {SECRET_KEY} from "../const-vars.js";

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

        const candidate = await table.User.findOne({
            where: {email}
        });

        if (candidate) {
            return next(ApiError.badRequest(`Пользователь с таким email уже существует!`));
        }

        const hashPassword = await bcrypt.hash(password, 5);
        const user = await table.User.create({
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
        const user = await table.User.findOne({where: {email}})
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

    async getAll(req, res) {
        const user = await table.User.findAll({
            where: {}
        });
        return res.json(user);
    }

    async getOne(req, res) {
        const {id} = req.params;
        const user = await table.User.findOne({id})
        return res.json(user);
    }
}

export default new UserController();
