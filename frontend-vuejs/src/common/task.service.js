import ApiService from './api.service'

const TaskService = {

    getAllTasks(){
        return ApiService.get("tasks")
    },
    addNewTask(data){
        return ApiService.post("tasks/task",data)
    },
    getTask(taskId){
        return ApiService.get("tasks/"+taskId)
    },
    deleteTask(taskId){
        return ApiService.delete("tasks/"+taskId)
    }
}
export default TaskService