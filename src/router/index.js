import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (to.hash) {
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        el: to.hash,
                        behavior: 'smooth'
                    })
                }, 800) // Adjust this delay as needed
            })
        }
        return savedPosition || { top: 0 }
    }
})

export default router
