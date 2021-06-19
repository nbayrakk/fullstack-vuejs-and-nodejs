import alertService from '../../common/alert.service'


const state = {
    alerts: [],
    alert: {}
}
const actions = {
    async fetchAlert({ commit }, taskId) {
        const { data } = await alertService.getAlert(taskId)
        commit('setAlert', data)
    },
    async postAlert({ commit }, alert) {
        const { data } = await alertService.postAlert(alert.taskId, alert.content)
        commit('addAlert', data)
    }
};
const mutations = {
    setAlert: (state, alerts) => {
        state.alerts = alerts
    },
    addAlert:(state,data)=>{
        state.alerts = data
    }
};
const getters = {
    getAlerts: (state) => {
        return state.alerts
    }
};
export default {
    state,
    actions,
    mutations,
    getters
}