import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/Login'
import DataImport from '@/components/data-import/DataImport'
import ChildrenRegister from '@/components/login/Register'
import ChildrenLogin from '@/components/login/Login'
import DataProcessing from '@/components/data-processing/DataProcessing'
import TaskDetail from '@/components/data-import/taskDetail'
import TaskRelease from '@/components/task-release/TaskRelease.vue'
import dataAnalysis from '@/components/data-analysis/dataAnalysis'
import dataMining from '@/components/data-mining/dataMining'
import Welcome from '@/components/welcome/WelcomePage.vue'
Vue.use(Router)
const router = new Router({
    routes: [{
        path: '/home',
        name: 'home',
        component: Home,
        children: [{
            path: 'data-import',
            name: 'data-import',
            component: DataImport,
            meta: {
                requireAuth: true
            },
        },
        {
            path: 'data-processing',
            name: 'data-processing',
            component: DataProcessing,
            meta: {
                requireAuth: true
            }
        },
        {
            path: 'data-processing/:id',
            name: 'data-processing',
            component: DataProcessing,
            meta: {
                requireAuth: true
            }
        },
        {
            path: 'task-detail/:id',
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
        },{
            path: 'data-mining',
            name: 'data-mining',
            component: dataMining,
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
        path:'/welcome',
        name:'welcome',
        component:Welcome,
    },
    {
        path: '/',
        name: 'login',
        component: Login,
        children: [{
            path: '/',
            component: ChildrenLogin
        }, {
            path: '/register',
            component: ChildrenRegister
        }]
    }
    ]
})

//TODO:token 未正确使用
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