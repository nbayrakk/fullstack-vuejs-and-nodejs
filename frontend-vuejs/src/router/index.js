import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '../views/HomePage'
import store from '../store'

import Login from '../views/Login'
import Register from '../views/Register'
import TaskDetail from '../views/Task-Detail'
import Profile from '../views/Profile'
Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/',
            name:'home',
            component:Homepage,
            beforeEnter:(to,from,next) => {
                if(store.state.auth.isAuthenticated == false ){
                    next({name:'login'})
                }else {
                    next(true);
                }
            }
            // ,
            // children:[
            //     {
            //         path:'/:taskId',
            //         name:'detail',
            //         component:TaskDetail,
            //         props:true,
            //     },
            // ]
        },
        {
            path:'/profile/:userId',
            name:'profile',
            component:Profile,
            props:true
        },
        {
            path:'/task-detail/:taskId',
            name:'detail',
            component:TaskDetail,
            props:true,
        },
        {
            path:'/auth/login',
            name:'login',
            component:Login
        },
        {
            path:'/auth/register',
            name:'register',
            component:Register
        }
    ]
})