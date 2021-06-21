import taskService from '../../common/task.service'

const state = {
    tasks: [],
    task: {}
};

const actions = {
    async fetchTasks({ commit }) {
        const { data } = await taskService.getAllTasks()
        commit('setTasks', data)
    },
    async newTask({ commit }, task) {
        const { data } = await taskService.addNewTask(task)
        commit('updateTask', data)
    },
    async fetchTask({ commit }, taskId) {
        const { data } = await taskService.getTask(taskId)
        commit('setTask', data)
    },
    async deleteTask({commit},taskId){
        const {data} = await taskService.deleteTask(taskId)
        commit('deleteTask',data)
    },
    resetTaskAction({commit}){
        console.log("asd")
        commit('resetTask')
    }
};

const mutations = {
    setTasks: (state, tasks) => {
        return state.tasks = tasks.data
    },
    updateTask: (state, task) => {
        return state.tasks.push(task.data)
    },
    setTask: (state, task) => {
        return state.task = task.data
    },
    deleteTask:(state,task)=>{
        let newTask=[]
        state.tasks.map(t=>{
            if(task._id != t._id){
                newTask.push(t)
            }
        })
        state.tasks = newTask
        return state.tasks
    },
    resetTask:(state)=>{
        state.task = {}
    }
         
    
};
const getters = {
    getTasks: (state) => {
        return state.tasks
    },
    getTask: (state) => {
        return state.task
    }

};

export default {
    state,
    actions,
    mutations,
    getters
}