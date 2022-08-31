import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/login',
        name: 'login',
        component: () =>
            import ('@/views/login')
    },
    {
        path: '/',
        // name: 'layout',
        component: () =>
            import ('@/views/layout'),
        children: [{
                path: '',
                name: 'home',
                component: () =>
                    import ('@/views/home')
            },
            {
                path: '/wd',
                name: 'wd',
                component: () =>
                    import ('@/views/wenda')
            }, {
                path: '/video',
                name: 'video',
                component: () =>
                    import ('@/views/video')
            }, {
                path: '/my',
                name: 'my',
                component: () =>
                    import ('@/views/my')
            }
        ]
    },
    {
        path: '/search',
        name: 'search',
        component: () =>
            import ('@/components/Search')
    },
    {
        path: '/article/:articleId',
        name: 'article',
        component: () =>
            import ('@/views/article'),
        props: true
    },
    {
        path: '/user-edit',
        name: 'user-edit',
        component: () =>
            import ('@/views/user/user-edit'),
    },
    {
        path: '/user-collect',
        name: 'user-collect',
        component: () =>
            import ('@/views/user/user-collect'),
    },
    {
        path: '/user-history',
        name: 'user-history',
        component: () =>
            import ('@/views/user/user-history'),
    },
    {
        path: '/user-follow',
        name: 'user-follow',
        component: () =>
            import ('@/views/user/user-follow'),
    },
    {
        path: '/user-fans',
        name: 'user-fans',
        component: () =>
            import ('@/views/user/user-fans'),
    },






]

const router = new VueRouter({
    routes
})

export default router