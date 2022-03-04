import User from '../model/User.js'
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'
import { SECRET_KEY } from '../data/config.js'

export const createUser = async (req, res) => {
    try {
        const { username, password, fullname } = req.body
        const candidate = await User.findOne({username})
        if (candidate) {
            res.status(400).json({"error" : `user with username = ${username} already exist`})
        }
        const salt = bcrypt.genSaltSync(SECRET_KEY)
        const hashPassword = bcrypt.hashSync(password, salt)
        const user = new User({username, password: hashPassword, fullname})
        await user.save()
        return res.status(200).json(user)
    } catch (error) {
        res.status(400).json({"error" : error})
    }
}

const generateAccessToken = (id) => {
    const payload = {
        id
    }
    return jwt.sign(payload, SECRET_KEY.toString(), {expiresIn: "24h"})
}

export const signIn = async (req, res) => {
    try {
        const {username, password} = req.body
        const user = await User.findOne({ username })
        if (!user) {
            res.status(400).json({"error" : `Пользователь ${username} не найден!`})
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            res.status(400).json({"error" : `Неверно введен пароль`})
        }
        const token = generateAccessToken(user._id)
        res.status(200).json({token})
    } catch (e) {
        console.log(e)
        res.status(400).json({"error" : e})
    }
}

export const getUsers = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (e) {
        res.status(400).json({"error" : e})
    }
}