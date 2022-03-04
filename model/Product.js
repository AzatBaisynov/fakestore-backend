import pkg from 'mongoose'

const Schema = pkg.Schema
const model = pkg.model

const Product = new Schema({
    title: { type: String, required: true},
    price: { type: Number, required: true},
    description: { type: String},
    category: { type: String, required: true},
    image: { type: String },
    rate: { type: Number },
    count: { type: Number }
})

export default model('Product', Product)