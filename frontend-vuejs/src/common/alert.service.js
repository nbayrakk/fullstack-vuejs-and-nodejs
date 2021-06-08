import ApiService from "./api.service"

const AlertService= {
    getAlert(taskId,alertId){
        return ApiService.get("tasks/"+taskId+"alert/"+alertId)
    }
}

export default AlertService