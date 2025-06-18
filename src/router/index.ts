import { usePermissionStore } from '@/stores'
import { createRouter, createWebHashHistory, createWebHistory, useRouter, type RouteRecordRaw } from 'vue-router'
import { constantRouter } from './config'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRouter as RouteRecordRaw[],
})  
export default router;