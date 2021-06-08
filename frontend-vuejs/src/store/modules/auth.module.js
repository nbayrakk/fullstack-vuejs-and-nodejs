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
            console.log(data)
            ApiService.setHeader();
            commit('setUser', data)
        } catch (error) {
            console.log(error)
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
            console.log(error)
            let message = {message:"Please check your inputs!"}
            commit('setError', message);
            throw new Error()

        }
    },
    async logout({commit}){
        const {data} = await AuthService.logout()
        ApiService.setHeader();

        console.log(data)
        commit('purgeAuth')
    },
    checkAuth(context) {
        if (jwtService.getToken()) {
            ApiService.setHeader();
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
        jwtService.saveToken(data.access_token)
        return state.user = data.user
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
        console.log(state)
        return state.errors
    }
};
export default {
    state,
    actions,
    mutations,
    getters
}