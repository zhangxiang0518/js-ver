/*
 * @Author: Tyler Tianyi Liu
 * @Date: 2023-08-29 01:01:12
 * @LastEditTime: 2023-11-08 16:10:19
 * @Version: 
 */
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: '/dashboard' },
    {
      path: '/',
      component: () => import('../layouts/default.vue'),
      children: [
        {
          path: 'dashboard',
          component: () => import('../pages/dashboard.vue'),
        },
        // {
        //   path: 'account-settings',
        //   component: () => import('../pages/account-settings.vue'),
        // },
        {
          path: 'typography',
          component: () => import('../pages/typography.vue'),
        },
        {
          path: 'icons',
          component: () => import('../pages/icons.vue'),
        },
        {
          path: 'cards',
          component: () => import('../pages/cards.vue'),
        },
        {
          path: 'tables',
          component: () => import('../pages/tables.vue'),
        },
        {
          path: 'form-layouts',
          component: () => import('../pages/form-layouts.vue'),
        },
        {
          path: 'profile',
          component: () => import('../pages/account-settings.vue'),
        },
        {
          path: 'settings',
          component: () => import('../pages/settings.vue'),
        },
        {
          path: 'settings/user-info',
          component: () => import('../pages/settings/user-info.vue'),
        },
        {
          path: 'parameters',
          component: () => import('../pages/parameters-table.vue'),
        },
        {
          path: 'dashboard-test',
          component: () => import('../pages/dashboard-ori.vue'),
        },
        {
          path: 'recommendation-test',
          component: () => import('../pages/recommendation-test.vue'),
        },
        {
          path: 'test',
          component: () => import('../pages/test.vue'),
        },
        {
          path: 'indoor-stats',
          component: () => import('../pages/indoor-stats.vue'),
        },
        {
          path: 'outdoor-stats',
          component: () => import('../pages/outdoor-stats.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('../layouts/blank.vue'),
      children: [
        {
          path: 'login',
          component: () => import('../pages/login.vue'),
        },
        {
          path: 'register',
          component: () => import('../pages/register.vue'),
        },
        {
          path: '/:pathMatch(.*)*',
          component: () => import('../pages/[...all].vue'),
        },
      ],
    },
  ],
})

export default router
