import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'
import { emailValidator } from './EmailValidator.js'
import validator from 'validator'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true, 'Please provide username'],
        unique: [true, 'Username already exists'],
        maxlength: [30, 'username cannot be longer than 30 characters']
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: 6
    },
    email: {
        type: String,
        required: [true, 'Please provide a email'],
        unique: [true, 'Email already exists'],
        validate: {
            validator: emailValidator,
            message: 'Please provide a valid email'
        }
    },
    role: {
        type: String,
        default: 'user'
    } 
})

UserSchema.pre('save', async function (){
    if(this.isModified('password')){
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt)
    }
})

UserSchema.methods.comparePassword = async function (candidatePassword){
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch  
}

const User = mongoose.model('user', UserSchema)

export { User }
