import AuthService from "../../common/auth.service";
import ApiService from "../../common/api.service";
import jwtService from "../../common/jwt.service"

const state = {
    errors:{},
    user: {},
    isAuthenticated: !!jwtService.getToken(),
    profile:{}
};
const actions = {
    async login({ commit }, user) {

        try {
            const { data } = await AuthService.login(user)
            ApiService.setHeader();
            commit('setUser', data)
        } catch (error) {
            let message = {message:"Please check your inputs!"}
            commit('setError', message);
            throw new Error()
        }

       
    },
    async register({ commit }, user) {
        try {
            const {data} = await AuthService.register(user) 
            commit('setUser',data)
        } catch (error) {
            let message = {message:"Please check your inputs!"}
            commit('setError', message);
            throw new Error()

        }
    },
    async logout({commit}){
        const {data} = await AuthService.logout()
        ApiService.setHeader();

        commit('purgeAuth')
    },
    async editUser({commit},user,userId){
        const {data} = await AuthService.editUser(user,user.id)
        commit('setCurrentUser',data)
    },
    async checkAuth(context) {
        if (jwtService.getToken().token) {
            ApiService.setHeader();
            let user = JSON.parse(jwtService.getToken().user) 
            context.commit('setUser',user)
        } else {
            context.commit('purgeAuth');
        }
    },
    async fetchProfile({commit}){
        const {data} = await AuthService.profile()
        commit('setProfile',data)
    }

};

const mutations = {
    setUser: (state, data) => {
        data.success ? state.isAuthenticated = true : state.isAuthenticated = false
        jwtService.saveToken(data.access_token,data.user)
        state.user = data.user
    },
    setCurrentUser:(state,data)=>{
        state.user.name = data.name
        state.user.email = data.email 
        return state.user
    },
    register: () => {

    },
    purgeAuth: (state) => {
        state.isAuthenticated = false;
        state.user = {};
        state.errors = {};
        jwtService.destroyToken();
    },
    setError: (state, message) => {
        return state.errors = message
    }
};
const getters = {
    currentUser(state) {
        return state.user;
    },
    isAuthenticated(state) {
        return state.isAuthenticated;
    },
    getErrors(state) {
        return state.errors
    },
    getUser(state){
        return state.user
    }
};
export default {
    state,
    actions,
    mutations,
    getters
}