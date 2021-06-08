import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '../components/HomePage'
import store from '../store'

import Login from '../components/Login'
import Register from '../components/Register'
import TaskDetail from '../components/Task-Detail'
import Profile from '../components/Profile'
Vue.use(Router)

export default new Router({
    routes:[
        {
            path:'/',
            name:'home',
            component:Homepage,
            beforeEnter:(to,from,next) => {
                console.log(to)
                console.log(from)
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
            path:'/profile',
            name:'profile',
            component:Profile    
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