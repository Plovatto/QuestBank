import { createRouter, createWebHistory } from "vue-router";
import jwt_decode from "jwt-decode";
import Login from "@/views/Login.vue";
import redefinir from "@/views/Redefinir.vue";
import Inicio from "@/views/Inicio.vue";
import Home from "@/views/Home.vue";
import Perfil from "@/views/Perfil.vue";
import CriarTopico from "@/components/telaHome/Topicos/CriarTopico.vue";
import CriarQuestao from "@/components/telaHome/Questoes/CriarQuestao.vue";
import CriarProva from "@/components/telaHome/Provas/CriarProva.vue";
import CriarAlternativa from "@/components/telaHome/Alternativas/CriarAlternativa.vue";
import QuestaoDetalhes from "@/components/telaHome/Questoes/QuestaoDetalhes.vue";
import telaConfim from "@/components/telaHome/telaConfim.vue";

import telaConfimExcluir from "@/components/telaHome/telaConfimExcluir.vue";
import telaErro from "@/components/telaHome/telaErro.vue";
import TopicosDetalhes from "@/components/telaHome/Topicos/TopicosDetalhes.vue";
import ProvasDetalhes from "@/components/telaHome/Provas/ProvasDetalhes.vue";
import EditarTopico from "@/components/telaHome/Topicos/EditarTopico.vue";
import EditarProvas from "@/components/telaHome/Provas/EditarProvas.vue";
import EditarQuestao from "@/components/telaHome/Questoes/EditarQuestao.vue";
import AlternativaDetalhes from "@/components/telaHome/Alternativas/AlternativaDetalhes";
import EditarAlternativas from "@/components/telaHome/Alternativas/EditarAlternativas";
import Logo from "./components/Logo.vue";
const routes = [
  { path: "/", name: "Inicio", component: Inicio },
  { path: "/Login", name: "Login", component: Login },
  { path: "/Logo", name: "Logo", component: Logo },
  { path: "/redefinir", name: "redefinir", component: redefinir },

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
    path: "/CriarAlternativa",
    name: "CriarAlternativa",
    component: CriarAlternativa,
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
  {
    path: "/alternativa-detalhes/:id",
    name: "AlternativaDetalhes",
    component: AlternativaDetalhes,
    props: true,
    beforeEnter: requireAuth,
  },
  { path: "/telaConfim", name: "telaConfim", component: telaConfim },

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
  {path: '/editar-alternativas/:id',
  name: 'EditarAlternativas',
  component: EditarAlternativas,
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

function isTokenExpired(token) {
  const decoded = jwt_decode(token);
  const currentTimestamp = Math.floor(Date.now() / 1000);

  return decoded.exp < currentTimestamp;
}

function requireAuth(to, from, next) {
  const token = localStorage.getItem("token");
  const perfil = localStorage.getItem("userPerfil"); 
  const id = localStorage.getItem("userId"); 
  if (!token && to.name !== "Login" && to.name !== "redefinir") {
    console.log(token);
    console.log(id);
    router.push("/Login");
  } else if (to.name !== "Login" && to.name !== "redefinir") {
    if (isTokenExpired(token)) {
      console.log(id);
      console.log(token);
      router.push("/Login");
    } else {
     console.log(token);
     console.log(id);
      next();
    }
  } else if (!token && to.name === "Login" && to.name !== "redefinir") {
    console.log(token);
    console.log(id);
    next();
  } else if (perfil !== "professor" && perfil !== "admin") {
   
    router.push("/Login");
  } else {
    console.log(id);
    next();
  }  
  
  
}
router.beforeEach((to, from, next) => {
  requireAuth(to, from, next);
}); 
export default router;