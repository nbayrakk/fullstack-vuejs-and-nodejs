const mongoose = require('mongoose')

const Task = require('./Task')

const Schema = mongoose.Schema

const AlertSchema = new Schema({
    content: {
        type: String,
        required: [true, "Content is required!"]
    },
    slug: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    task: {
        type: mongoose.Schema.ObjectId,
        ref: "Task"
    }
});
AlertSchema.pre("save", async function (next) {
    if (!this.isModified('user')) return next();

    try {
        const task = await Task.findById(this.task)
        task.alerts.push(this._id);

        await task.save();
    } catch (err) {
        return next(err);
    }


})


module.exports = mongoose.model("Alert", AlertSchema)