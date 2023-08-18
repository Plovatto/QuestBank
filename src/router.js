
import { createRouter, createWebHistory } from 'vue-router';

//views
import Login from './views/Login.vue';
import Redefinir from './views/Redefinir.vue';
import Inicio from './views/Inicio.vue';
import Home from './views/Home.vue';
import Perfil from './views/Perfil.vue';
import CriarTopico from '@/components/telaHome/Topicos/CriarTopico.vue';
import CriarQuestao from '@/components/telaHome/Questoes/CriarQuestao.vue';
import CriarAlternativa from '@/components/telaHome/Questoes/CriarAlternativa.vue';
import CriarProva from '@/components/telaHome/Provas/CriarProva.vue';
import QuestaoDetalhes from '@/components/telaHome/Questoes/QuestaoDetalhes.vue';
import telaConfim from '@/components/telaHome/telaConfim.vue';

//components
import Logo from './components/Logo.vue';







const routes = [
  
  {path: '/', component: () => import('@/layouts/default/Default.vue')},
  {path: '',name: 'Inicio',component: () => import('@/views/Inicio.vue')}, 
  { path: '/Inicio', component: Inicio },
  { path: '/Login', component: Login },
  { path: '/Logo', component: Logo },
  { path: '/Redefinir', component: Redefinir },  

  { path: '/Home', component: Home , name: 'Home'},
  { path: '/Perfil', component: Perfil},
  { path: '/CriarTopico', name: 'CriarTopico', component: CriarTopico},
  { path: '/CriarQuestao', name: 'CriarQuestao', component: CriarQuestao},
  { path: '/CriarAlternativa', name: 'CriarAlternativa', component: CriarAlternativa},
  { path: '/CriarProva', name: 'CriarProva', component: CriarProva},
  {
    path: '/questao-detalhes/:id',
    name: 'QuestaoDetalhes',
    component: QuestaoDetalhes,
    props: true,
  },
  { path: '/telaConfim', name: 'telaConfim', component: telaConfim},

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

