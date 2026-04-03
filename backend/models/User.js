import mongoose from 'mongoose'
import validator from 'validator'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required: [true, 'Please provide username'],
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
        validate: {
            validator: validator.isEmail,
            msg: 'Please provide a valid email'
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
