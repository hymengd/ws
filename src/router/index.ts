import { createRouter, createWebHistory } from 'vue-router'
// import { useUserStore } from '../stores/index'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/chat',
      component: () => import('@/views/communication/chat.vue')
    },
    {
      path: '/',
      component: () => import('@/views/index.vue')
    },
    {
      path: '/login',
      component: () => import('@/views/login.vue')
    }
  ]
})
// router.beforeEach((to, from, next) => {
//   const userStore = useUserStore()
  
//   if (to.meta.requiresAuth && !userStore.isLoggedIn) {
//     next('/login')
//   } else {
//     next()
//   }
// })
export default router