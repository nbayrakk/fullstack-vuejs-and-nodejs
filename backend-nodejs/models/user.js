const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required!"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "Please provide a valid mail!"
        ]
    },
    password: {
        type: String,
        required: true,
        minLength: [6, "Min password length 6."],
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});


UserSchema.methods.generateJwtFromUser = function () {

    const { JWT_EXPIRE, JWT_SECRET_KEY } = process.env;

    const payload = {
        id: this._id,
        name: this.name
    }
    const token = jwt.sign(payload, JWT_SECRET_KEY,
        {
            expiresIn: JWT_EXPIRE
        })
    return token;
}

UserSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        next();
    }

    bcrypt.genSalt(10, (err, salt) => {
        if (err) next(err);

        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) next(err);
            this.password = hash;
            next();
        });
    });
})


module.exports = mongoose.model("User", UserSchema)