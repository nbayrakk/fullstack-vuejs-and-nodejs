const customError = require('../../helpers/error/CustomError')
const jwt = require('jsonwebtoken')
const Task = require('../../models/Task')
const Alert = require('../../models/Alert')
const asyncErrorWrapper = require('express-async-handler')

const { isTokenIncluded, getAccessTokenFromHeader } = require('../../helpers/authorazition/tokenHelpers')

const getAccessToRouter = (req, res, next) => {
    const { JWT_SECRET_KEY } = process.env
    console.log(req.headers.authorization)
    if (!isTokenIncluded(req)) {
        return next(new customError("You are not authorization this router"), 401)
    }
    const access_token = getAccessTokenFromHeader(req)
    jwt.verify(access_token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return next(new CustomError("You are not authorization this router", 401))
        }
        req.user = {
            name:decoded.name,
            id:decoded.id
        }
        console.log(req.user)
        next();

    })
}
const getTaskOwnerAccess= asyncErrorWrapper(async(req,res,next) => {
    const userId = req.user.id
    const taskId = req['params']
    const task = await Task.findById(taskId.id)
    console.log(task)
    if(task.user.id != userId){
        return next(new customError("You are not authorization this router"), 403);
    }
    next();
    
});
const getAlertOwnerAccess = asyncErrorWrapper(async(req,res,next) => {
    const userId = req.user.id
    const alertId = req.params.alertId
    const alert = await Alert.findById(alertId)
    console.log(alert.user,userId)
    if(alert.user != userId){
        return next(new CustomError("You are not authorization this router",403))
    }
    next();
});
module.exports = {
    getAccessToRouter,
    getTaskOwnerAccess,
    getAlertOwnerAccess
}