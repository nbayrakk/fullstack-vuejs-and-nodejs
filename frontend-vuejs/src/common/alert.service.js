import ApiService from "./api.service"

const AlertService = {
    getAlert(taskId) {
        return ApiService.get("tasks/" + taskId + "/alert")
    },
    postAlert(taskId, alert) {
        return ApiService.post(`tasks/${taskId}/alert`, alert);
    }
}

export default AlertService