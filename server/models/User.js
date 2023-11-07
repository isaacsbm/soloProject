const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Users must provide first name!"],
    },
    lastName: {
        type: String,
        required: [true, "Users must provide last name!"],
    },
    username: {
        type: String,
        required: [true, "Username is required!"]
    },
    email: {
        type: String,
        required: [true, "email is required!"]
    },
    password: {
        type: String,
        required: [true, "Password is required!"],
        minLength: [8, "Password must be at least 8 characters long!"]
    }
}, {timestamps: true});

UserSchema.virtual("confirmPassword")
    .get( () => this._confirmPassword )
    .set( value => this._confirmPassword = value );

UserSchema.pre('validate', function(next) {
    if (this.password !== this.confirmPassword){
        this.invalidate("confirmPassword", "Password and Confirm Password must match!")
    }
    next();
})

UserSchema.pre('save', function(next){
    bcrypt.hash(this.password, 10)
        .then( hash => {
            this.password = hash;
            next();
        })
})

module.exports = mongoose.model("User", UserSchema);