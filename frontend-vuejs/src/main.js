import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'
import router from './router'
import Vuex from 'vuex'
import ApiService from './common/api.service'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
ApiService.init()

Vue.use(IconsPlugin)
Vue.config.productionTip = true
Vue.config.devtools = false;
Vue.config.productionTip = false
Vue.use(require('vue-moment'));
Vue.use(Vuex);

// router.beforeEach((to, from, next) => {
//   try {
//     let token = store.state.auth.isAuthenticated
//     if(token){
//       store.dispatch('checkAuth')
//       store.dispatch('login')
//       next({name:'home'})
//     }
//   } catch (e) {
//     next({name:'login'})
//   }
// }



new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
