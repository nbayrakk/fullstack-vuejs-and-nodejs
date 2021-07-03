import ApiService from './api.service'

const path = 'tasks'
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
    },
    likeTask(taskId){
        return ApiService.get(path+`/${taskId}/like`)
    },
    unlikeTask(taskId){
        return ApiService.get(path+`/${taskId}/unlike`)
        
    }
}
export default TaskService