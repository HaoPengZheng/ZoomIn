import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import login from '@/components/login'
import dataImport from '@/components/data-import/dataImport'
import childrenRegister from '@/components/login/register'
import childrenLogin from '@/components/login/toLogin'
import dataProcessing from '@/components/data-processing/dataProcessing'
import TaskDetail from '@/components/data-import/taskDetail'
import TaskRelease from '@/components/task-release/taskRelease.vue'
import dataAnalysis from '@/components/data-analysis/dataAnalysis'

Vue.use(Router)
const router = new Router({
    routes: [{
        path: '/home',
        name: 'home',
        component: home,
        children: [{
            path: 'data-import',
            name: 'data-import',
            component: dataImport,
            meta: {
                requireAuth: true
            },
        },
        {
            path: 'data-processing',
            name: 'data-processing',
            component: dataProcessing,
            meta: {
                requireAuth: true
            }
        },
        {
            path: 'task-detail',
            name: 'task-detail',
            component: TaskDetail,
            meta: {
                requireAuth: true
            }
        },
        {
            path: 'task-release',
            name: 'task-release',
            component: TaskRelease,
            meta: {
                requireAuth: true
            }
        }, {
            path: 'data-analysis',
            name: 'data-analysis',
            component: dataAnalysis,
            meta: {
                requireAuth: true
            },
        }

        ],
        meta: {
            requireAuth: true
        }
    },
    {
        path: '/',
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
                path: '/'
            })
        }
    } else {
        next()
    }
})

export default router