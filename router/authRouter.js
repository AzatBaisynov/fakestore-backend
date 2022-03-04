import express from "express";
import { check } from "express-validator";
import {createUser, signIn, getUsers} from "../controller/authController.js"
import {authMiddleware} from "../middleware/authMiddleware.js";

const Router = express.Router

const authRouter = new Router()

authRouter.post('/sighup', createUser)

authRouter.post('/sigh-in', [
    check('username', 'имя пользователя не может быть пустым').notEmpty(),
    check('password', 'пароль не может быть короче 4 символов и длиннее 12 символов').isLength({min : 4, max: 12})
], signIn)

authRouter.get('/users', authMiddleware, getUsers)

export default authRouter