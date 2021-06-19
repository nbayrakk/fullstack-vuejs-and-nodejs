const Task = require('../models/Task')
const CustomError = require('../helpers/error/CustomError')
const asyncErrorWrapper = require('express-async-handler')

const addNewtask = asyncErrorWrapper(async(req,res,next) => {
    const information = req.body
    const task = await Task.create({
        ...information,
        user:req.user.id
    })
    res.status(200)
    .json({
        success:true,
        data:task
    })
});
const getAllTasks = asyncErrorWrapper(async(req,res,next)=> {
    const tasks = await Task.find().populate({
        path: 'user',
        populate: {
            path: 'user' 
        }
   })
    res.status(200)
    .json({
        success:true,
        data:tasks
    })
})
const getSingleTask = asyncErrorWrapper(async(req,res,next)=> {
    const {id} = req.params
    const task = await Task.findById(id)
    .populate('alerts')
    .populate({
        path: 'alerts',
        populate: {
            path: 'user' 
        }
   })


    res.status(200)
    .json({
        success:true,
        data:task
    });

});
const editTask= asyncErrorWrapper(async(req,res,next) => {
    const taskId = req.params;
    const {title,detail} = req.body

    let task = await Task.findById(taskId.id)

    task.title = title
    task.detail = detail
    console.log(task)

    task = await task.save();
    return res.status(200)
    .json({
        success:true,
        data:task
    })

});
const likeTask=asyncErrorWrapper(async(req,res,next) => {
    console.log(req.params,req.params.id)
    const {id} = req.params
    const task = await Task.findById(id)
    if(task.likes.includes(req.user.id)){
        return next(new CustomError("You already like this task!",400))
    }
    task.likes.push(req.user.id);
    await task.save();
    return res.status(200)
    .json({
        success:true,
        message:task
    })
});
const undoLikeTask = asyncErrorWrapper(async(req,res,next) => {
    const {id} = req.params
    const task = await Task.findById(id)
    if(!task.likes.includes(req.user.id)){
        return next(new CustomError("You can not undo like this task!",200))
    }
    const taskIndex = task.likes.indexOf(req.user.id);
    task.likes.splice(taskIndex,1);
    await task.save();
    return res.status(200)
    .json({
        success:true,
        message:task
    })
});
const deleteTask = asyncErrorWrapper(async(req,res,next)=>{
    const {taskId}=req.params
    const tasks = await Task.findById(taskId)
    await Task.findByIdAndDelete(taskId);
    res.status(200)
    .json({
        success:true,
        data:tasks
    })
});
module.exports= {
    deleteTask,
    addNewtask,
    getAllTasks,
    getSingleTask,
    editTask,
    likeTask,
    undoLikeTask
}