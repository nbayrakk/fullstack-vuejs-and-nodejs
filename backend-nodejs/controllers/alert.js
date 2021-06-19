const asyncErrorWrapper = require('express-async-handler')
const Task = require('../models/Task')
const Alert = require('../models/Alert')
const CustomError = require('../helpers/error/CustomError')


const addNewAlert = asyncErrorWrapper(async (req, res, next) => {
    const taskId = req.params.taskId
    const userId = req.user.id
    const information = req.body
    if (!information) {
        return next(new CustomError("information is required!", 400))
    }
    const alert = await Alert.create({
        ...information,
        task: taskId,
        user: userId
    })

    return res.status(200)
        .json({
            success: true,
            message: alert
        });
});

const getAllAlertForTask = asyncErrorWrapper(async (req, res, next) => {
    const taskId = req.params.taskId
    const task = await Task.findById(taskId).populate("alerts")
    const alerts = task.alerts;
    return res.status(200)
        .json({
            success: true,
            count: alerts.length,
            data: alerts
        })
});
const getSingleAnswer = asyncErrorWrapper(async (req, res, next) => {
    const alertId = req.params.alertId

    const alert = await Alert.findById(alertId)
        .populate("user")
        .populate("task")
    if (!alert) {
        return next(new CustomError("There is no alert with id assosiated with task!", 400))
    }
    return res.status(200).json({
        success: true,
        data: alert
    })


});

const editAlert= asyncErrorWrapper(async(req,res,next) => {
    console.log(req.params)
    const alertId = req.params.alertId
    const {content} = req.body

    const alert = await Alert.findById(alertId)
    console.log(alert)
    alert.content = content
    await alert.save();
    
    return res.status(200).json({
        success: true,
        data: alert
    })

});
const deleteAlert = asyncErrorWrapper(async(req,res,next) => {
    const alertId = req.params.alertId
    const taskId = req.params.taskId
    await Alert.findByIdAndRemove(alertId)

    const task = await Task.findById(taskId)

    task.alerts.splice(tasks.alerts.indexOf(alertId),1)
    await task.save();
    
    return res.status(200).json({
        success: true,
        data: "Alert deleted!"
    })
});
module.exports = {
    addNewAlert,
    getAllAlertForTask,
    getSingleAnswer,
    editAlert,
    deleteAlert
}