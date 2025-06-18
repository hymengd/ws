import type { RouteRecordRaw } from 'vue-router';
import mainLayout from '@/layouts/mainLayout.vue'

export const constantRouter: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'mainLayout',
    component: mainLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/index.vue'),
      }
    ],
    meta: { hidden: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: { hidden: true }
  },
]
export const asyncRouter: RouteRecordRaw[] = [
  {
    path: 'user',
    name: 'user',
    children: [
      {
        path: 'info',
        name: 'info',
        component: () => import('@/views/user/info.vue'),
        meta: { roles: ['user', 'admin'] }
      },
      {
        path: 'setting',
        name: 'setting',
        component: () => import('@/views/user/setting.vue'),
        meta: { roles: ['user'] }
      }
    ]
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('@/views/communication/chat.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/system/test.vue'),
    meta: { roles: ['test'] }
  },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: 'NotFound',
  //   component: () => import('@/views/system/404.vue')
  // }
]