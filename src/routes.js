import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import menuModule from './vuex/modules/menu'  
Vue.use(VueRouter)

// const modules = require.context('@/views/common', true, /router\.js$/);
// modules.keys().forEach(key => {
//     routes = routes.concat(modules(key).default);
// });


let routes = [
    
    {
        path:'/',
        component: resolve => require(['@/views/common/home'],resolve),
        hidden:true
    },
    {
        path: '/login',
        component: resolve => require(['@/views/common/login'],resolve),
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: resolve => require(['@/views/common/404'],resolve),
        name: '',
        hidden: true
    },
    // {
    //     path: '*',
    //     hidden: true,
    //     redirect: { path: '/404' }
    // },

]


routes.sort(function(obj1,obj2){
    if(typeof obj1.sort !== 'number'){
        return 1
    }

    if(obj1.sort < obj2.sort){
        return -1
    }else if(obj1.sort > obj2.sort){
        return 1
    }else{
        return 0
    }

})

NProgress.configure({ showSpinner: true });

const router = new VueRouter({
    routes
})

/*
* 登陆拦截 start
*/
router.beforeEach((to, from, next) => {
    NProgress.start();
    if (to.path == '/login') {
        sessionStorage.removeItem('user');
    }
    let user = JSON.parse(sessionStorage.getItem('user'));
    if (!user && to.path != '/login') {
        next({ path: '/login' })
    } else {
        next()
    }
})
/*
* 登陆拦截 end
*/

router.afterEach(transition => {
    NProgress.done();
});


export default router