// router.js
import { createRouter, createWebHistory } from 'vue-router';

//views
import Login from './views/Login.vue';
import Redefinir from './views/Redefinir.vue';
import Inicio from './views/Inicio.vue';
import Home from './views/Home.vue';

//components


import Logo from './components/Logo.vue';

//redefinir
import novaSenha from './components/telaRedefinir/novaSenha.vue';





const routes = [
  
  {path: '/', component: () => import('@/layouts/default/Default.vue')},
  {path: '',name: 'Inicio',component: () => import('@/views/Inicio.vue')}, 
  { path: '/Inicio', component: Inicio },
  { path: '/Login', component: Login },
  { path: '/Logo', component: Logo },
  { path: '/Redefinir', component: Redefinir },  
  { path: '/novaSenha', component: novaSenha },
  { path: '/Home', component: Home},

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
