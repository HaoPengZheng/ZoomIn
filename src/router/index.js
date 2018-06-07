import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import home from '@/components/home'
import login from '@/components/login'
import dataImport from '@/components/data-import/dataImport'
import childrenRegister from '@/components/login/register'
import childrenLogin from '@/components/login/toLogin'

Vue.use(Router)
const router = new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: home,
            children: [{
                path: 'data-import',
                name: 'data-import',
                component: dataImport,
                meta: {
                    requireAuth: true
                }
            }]
        },
        {
            path: '/login',
            name: 'login',
            component: login,
            children: [{
                path: '/',
                component: childrenLogin
            }, {
                path: '/register',
                component: childrenRegister
            }]
        }
    ]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(res => res.meta.requireAuth)) {
        if (localStorage.getItem('token')) {
            next();
        } else {
            next({
                path: '/login'
            })
        }
    } else {
        next()
    }
})

export default router