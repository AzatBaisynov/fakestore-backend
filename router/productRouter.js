import express from "express";
import { check, param } from "express-validator";
import {authMiddleware} from "../middleware/authMiddleware.js";
import {createProduct, getAllProduct, getProductById} from "../controller/productController.js";

const Router = express.Router

const productRouter = new Router()

productRouter.post('/create', [
    authMiddleware,
    check('title', 'title не может быть пустым').notEmpty(),
    check('price', 'price не может быть пустым').notEmpty(),
    check('description', 'description не может быть пустым').notEmpty(),
    check('category', 'category не может быть пустым').notEmpty(),
    check('image', 'image не может быть пустым').notEmpty(),
    check('rate', 'rate не может быть пустым').notEmpty(),
    check('count', 'count не может быть пустым').notEmpty()
], createProduct)

productRouter.get("/all", authMiddleware, getAllProduct)

productRouter.get("/byid/:id", [
    authMiddleware,
    param(['id','id is required'])
], getProductById)

export default productRouter