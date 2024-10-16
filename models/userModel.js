import crypto from "crypto";
import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    fullName:{
        type: String,
        required: [true, "Please tell us your full name!"],
    },
    email:{
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"],
        
    },
    password:{
        type: String,
        required: [true, "Please provide a password"],
        minlength: 8,
        select: false,
    },
    passwordConfirm:{
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function(password){
                return password === this.password;

                  },
                  message: "Passwords are not the same!",
                }
        
    }
})

userSchema.pre("save", async function(next){
    // Hash the password before saving the user document
    // This middleware runs before every 'save' operation on a User document
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
    next();
})

userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

export default User;
