const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const slugify = require('slugify')

const Schema = mongoose.Schema

const TaskSchema = new Schema({
    title: {
        type: String,
        required: [true, "Name is required!"],
        unique:false
    },
    detail: {
        type: String,
        required: true,
        unique:false

    },
    slug: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required: false,
        ref: "User"
    },
    likes: [
        {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        }
    ],
    alerts: [
        {
            user: {
                type:mongoose.Schema.ObjectId,
                ref: "User"
            },
            type: mongoose.Schema.ObjectId,
            ref: "Alert"
        }
    ]
});
TaskSchema.pre("save", function (next) {
    if (!this.isModified('title')) {
        next();
    }
    this.slug = this.makeslug();
    next();
})

TaskSchema.methods.makeslug = function () {
    return slugify(this.title, {
        replacement: '-',
        remove: /[*+~.()'"!:@]/g,
        lower: true,
    })
}

module.exports = mongoose.model("Task", TaskSchema)