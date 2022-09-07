import {createRouter, createWebHistory} from 'vue-router';
import {defineAsyncComponent } from 'vue';

// import CoachesDetail from './pages/coaches/CoachesDetail.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
// import CoachesRegisteration from './pages/coaches/CoachesRegisteration.vue';

// import ContactCoach from './pages/requests/ContactCoach.vue';
// import RequestsReceive from './pages/requests/RequestsReceive.vue';
// import UserAuth from './pages/auth/UserAuth.vue';
import NotFound from './pages/NotFound.vue';
import store from './store/index.js'

const CoachesDetail=defineAsyncComponent(()=>import('./pages/coaches/CoachesDetail.vue'))
const CoachesRegisteration=defineAsyncComponent(()=>import('./pages/coaches/CoachesRegisteration.vue'))
const ContactCoach=defineAsyncComponent(()=>import('./pages/requests/ContactCoach.vue'))
const RequestsReceive=defineAsyncComponent(()=>import('./pages/requests/RequestsReceive.vue'))
const UserAuth=defineAsyncComponent(()=>import('./pages/auth/UserAuth.vue'))

const router=createRouter({
    history: createWebHistory(),
    routes:[
        {path:'/', redirect:'/coaches' },
        {path:'/coaches', component:CoachesList },
        {
            path:'/coaches/:id', 
            props:true,
            component:CoachesDetail,
            children:[
                {path:'contact', component: ContactCoach}
        ] },
        {path:'/register', component:CoachesRegisteration, meta:{requiresAuth:true} },
        {path:'/requests', component:RequestsReceive, meta:{requiresAuth:true} },
        {path:'/auth', component:UserAuth, meta:{requiresUnauth:true} },
        {path:'/:notFound(.*)', component:NotFound },
    ]
});

router.beforeEach(function(to, _,next){
    if(to.meta.requiresAuth && !store.getters.isAuthenticated){
        next('/auth');
    }else if(to.meta.requiresUnauth && store.getters.isAuthenticated){
        next('/coaches')
    }else{
        next();
    }
})

export default router;