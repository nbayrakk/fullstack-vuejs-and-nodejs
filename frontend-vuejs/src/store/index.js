import Vue from "vue";
import Vuex from 'vuex'
import tasks from './modules/tasks.module'
import auth from './modules/auth.module'
import alerts from './modules/alerts.module'
Vue.use(Vuex)
export default new Vuex.Store({
    modules:{
        tasks,
        alerts,
        auth
    }
});