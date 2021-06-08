const express = require('express')
const {addNewAlert,getAllAlertForTask,getSingleAnswer,editAlert,deleteAlert} = require('../controllers/alert')
const { getAccessToRouter,getAlertOwnerAccess } = require('../middlewares/authorization/auth')
const { checkTaskandAlert } = require('../middlewares/database/databaseErrorHelpers')

const router = express.Router({mergeParams:true});


router.post('/',getAccessToRouter,addNewAlert)
router.get('/',getAllAlertForTask)
router.get('/:alertId',checkTaskandAlert,getSingleAnswer)
router.put('/:alertId/edit',[checkTaskandAlert,getAccessToRouter,getAlertOwnerAccess],editAlert)
router.delete('/:alertId/delete',[checkTaskandAlert,getAccessToRouter,getAlertOwnerAccess],deleteAlert)

module.exports = router