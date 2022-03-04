import pkg from 'mongoose'

const Schema = pkg.Schema
const model = pkg.model

const User = new Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    fullname: { type: String }
})

export default model('User', User)