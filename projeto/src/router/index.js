// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        
        component: () => import('@/views/Home.vue'),
   
      },
    ],
  },
  {
    path: '/',
    component: () => import('@/components/Login.vue'),
    children: [
      {
        path: '',
        name: 'Redefinir',
        
        component: () => import('@/views/Redefinir.vue'),
   
      },
    ],
  },
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
