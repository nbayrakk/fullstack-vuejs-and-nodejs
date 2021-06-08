import AlertService from '../../common/alert.service'


const state = {
    alerts:[],
    alert:{}
}
const actions = {
    async fetchAlert( {commit} ,taskId,alertId){
        const {data} = await AlertService.getAlert(taskId,alertId)
        console.log(data)
        commit.dispatch('setAlert',data)
    }
};
const mutations = {

};
const getters = {

};
export default {
    state,
    actions,
    mutations,
    getters
}