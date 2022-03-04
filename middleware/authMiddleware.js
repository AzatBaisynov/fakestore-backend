import jwt from 'jsonwebtoken'
import {SECRET_KEY} from "../data/config.js";

export const authMiddleware = (req, res, next) => {
    if (req.method === "OPTION") {
        next()
    }
    try {
        const token = req.headers.authorization.split(" ")[1]
        const decodedData = jwt.verify(token, SECRET_KEY.toString())
        req.user = decodedData
        next()
    } catch (e) {
        console.log(e)
        return res.status(401).json({"error" : "auth error"})
    }
}