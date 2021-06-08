const express = require('express')
const alert = require('./alert')
const { addNewtask, getAllTasks, getSingleTask, editTask,likeTask,undoLikeTask,deleteTask } = require('../controllers/task')
const { getAccessToRouter, getTaskOwnerAccess } = require('../middlewares/authorization/auth')
const { checkTasksExist } = require('../middlewares/database/databaseErrorHelpers')

const router = express.Router()
// api/tasks
router.post('/task', getAccessToRouter, addNewtask)
// router.post('/task', addNewtask)
router.get('/', getAllTasks)
router.get('/:id', checkTasksExist, getSingleTask)
router.put('/edit/:id', [getAccessToRouter, checkTasksExist, getTaskOwnerAccess], editTask)
router.get('/:id/like', [getAccessToRouter, checkTasksExist], likeTask)
router.get('/:id/unlike', [getAccessToRouter, checkTasksExist], undoLikeTask)
router.delete('/:taskId', [getAccessToRouter, checkTasksExist],deleteTask)
router.use('/:taskId/alert',checkTasksExist,alert)

module.exports = router;