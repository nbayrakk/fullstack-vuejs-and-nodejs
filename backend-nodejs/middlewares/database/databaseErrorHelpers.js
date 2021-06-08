const asyncErrorWrapper = require('express-async-handler')
const Task = require('../../models/Task')
const Alert = require('../../models/Alert')
const CustomError = require('../../helpers/error/CustomError')


const checkTasksExist = asyncErrorWrapper(async ( req, res, next) => {
    const taskId = req['params'].taskId || req['params'].id
    const task = await Task.findById(taskId)

    if (!task) {
        return next(new CustomError("Not find task", 400))
    }
    next();

});

const checkTaskandAlert = asyncErrorWrapper(async(req,res,next) => {
    const taskId = req.params.taskId
    const alertId = req.params.alertId
    const alert = await Alert.findOne({
        _id:alertId,
        task:taskId
    });
    console.log(alert)
    if(!alert){
        return next(new CustomError("There is no alert with id assosiated with task!",400))
    }
    next();
})
module.exports = {
    checkTasksExist,
    checkTaskandAlert
}