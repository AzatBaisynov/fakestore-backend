import Product from "../model/Product.js";

export const createProduct = async (req, res) => {
    try {
        const { title, price, description, category, image, rate, count } = req.body
        const product = new Product({title, price, description, category, image, rate, count})
        await product.save()
        res.status(200).json(product)
    } catch (e) {
        console.log(e)
        res.status(400).json({"error": e})
    }
}

export const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find()
        res.status(200).json(products)
    } catch (e) {
        console.log(e)
        res.status(400).json({"error": e})
    }
}

export const getProductById = async (req, res) => {
    try {
        const id = req.params.id
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (e) {
        console.log(e)
        res.status(404).json({"error": e})
    }
}

