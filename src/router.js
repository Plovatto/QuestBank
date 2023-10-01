import { createRouter, createWebHistory } from "vue-router";
import Login from "@/views/Login.vue";
import Redefinir from "@/views/Redefinir.vue";
import Inicio from "@/views/Inicio.vue";
import Home from "@/views/Home.vue";
import Perfil from "@/views/Perfil.vue";
import CriarTopico from "@/components/telaHome/Topicos/CriarTopico.vue";
import CriarQuestao from "@/components/telaHome/Questoes/CriarQuestao.vue";
import CriarProva from "@/components/telaHome/Provas/CriarProva.vue";
import QuestaoDetalhes from "@/components/telaHome/Questoes/QuestaoDetalhes.vue";
import telaConfim from "@/components/telaHome/telaConfim.vue";
import telaConfimEdit from "@/components/telaHome/telaConfimEdit.vue";
import telaConfimExcluir from "@/components/telaHome/telaConfimExcluir.vue";
import telaErro from "@/components/telaHome/telaErro.vue";
import TopicosDetalhes from "@/components/telaHome/Topicos/TopicosDetalhes.vue";
import ProvasDetalhes from "@/components/telaHome/Provas/ProvasDetalhes.vue";
import EditarTopico from "@/components/telaHome/Topicos/EditarTopico.vue";
import EditarProvas from "@/components/telaHome/Provas/EditarProvas.vue";
import EditarQuestao from "@/components/telaHome/Questoes/EditarQuestao.vue";
import ResultadoPesquisa from '@/components/telaHome/Topicos/ResultadoPesquisa.vue';
import Logo from "./components/Logo.vue";
const routes = [
  { path: "/", name: "Inicio", component: Inicio },
  { path: "/Login", name: "Login", component: Login },
  { path: "/Logo", name: "Logo", component: Logo },
  { path: "/Redefinir", name: "Redefinir", component: Redefinir },

  {
    path: "/Home",
    name: "Home",
    component: Home,
    beforeEnter: requireAuth,
  },
  {
    path: "/Perfil",
    name: "Perfil",
    component: Perfil,
    beforeEnter: requireAuth,
  },
  {
    path: "/CriarTopico",
    name: "CriarTopico",
    component: CriarTopico,
    beforeEnter: requireAuth,
  },
  {
    path: "/CriarQuestao",
    name: "CriarQuestao",
    component: CriarQuestao,
    beforeEnter: requireAuth,
  },
  {
    path: "/CriarProva",
    name: "CriarProva",
    component: CriarProva,
    beforeEnter: requireAuth,
  },
  {
    path: "/questao-detalhes/:id",
    name: "QuestaoDetalhes",
    component: QuestaoDetalhes,
    props: true,
    beforeEnter: requireAuth,
  },
  { path: "/telaConfim", name: "telaConfim", component: telaConfim },
  { path: "/telaConfimEdit", name: "telaConfimEdit", component: telaConfimEdit },
  { path: "/telaConfimExcluir", name: "telaConfimExcluir", component: telaConfimExcluir },
  { path: "/telaErro", name: "telaErro", component: telaErro },
  {
    path: "/provas-detalhes/:id",
    name: "ProvasDetalhes",
    component: ProvasDetalhes,
    props: true,
  },
  {
    path: "/topicos-detalhes/:id",
    name: "TopicosDetalhes",
    component: TopicosDetalhes,
    props: true,
  },
  {
    path: '/editar-topico/:id',
    name: 'EditarTopico',
    component: EditarTopico,
  },
  {
    path: '/editar-provas/:id',
    name: 'EditarProvas',
    component: EditarProvas,
  },
  {    path: '/resultado-pesquisa',
  component: ResultadoPesquisa,
},
  {
    path: '/editar-questao/:id',
    name: 'EditarQuestao',
    component: EditarQuestao,
  },
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

function requireAuth(to, from, next) {
  const token = localStorage.getItem("token");
  console.log(token);
  if (!token && to.name !== "Login") {

    next("/Login"); 
  } else {
    
    next();
  }
}

router.beforeEach((to, from, next) => {
  requireAuth(to, from, next);
});

export default router;