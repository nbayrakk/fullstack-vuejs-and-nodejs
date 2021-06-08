import Vue from 'vue'
import axios from 'axios'
import VueAxios from "vue-axios";
import { API_URL } from "./config";
import jwtService from './jwt.service';

const ApiService = {
    init() {
        Vue.use(VueAxios, axios);
        Vue.axios.defaults.baseURL = API_URL;


    },
    setHeader() {
        Vue.axios.defaults.headers.common[
            "Authorization"
        ] = "Bearer " + jwtService.getToken();
    },
    get(resource, slug = "") {
        this.setHeader()
        return axios.get(`${API_URL}/${resource}`).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    },

    post(resource, params) {
        return axios.post(`${API_URL}/${resource}`, params);
    },

    update(resource, slug, params) {
        return axios.put(`${API_URL}/${resource}/${slug}`, params);
    },

    put(resource, params) {
        return axios.put(`${API_URL}/${resource}`, params);
    },

    delete(resource) {
        return axios.delete(resource).catch(error => {
            throw new Error(`[RWV] ApiService ${error}`);
        });
    }
}
export default ApiService;

