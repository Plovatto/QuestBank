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

import Logo from "./components/Logo.vue";

const routes = [
  { path: "/", component: () => import("@/layouts/default/Default.vue") },
  { path: "", name: "Inicio", component: () => import("@/views/Inicio.vue") },
  { path: "/Inicio", component: Inicio },
  { path: "/Login", name: "Login", component: Login },
  { path: "/Logo", name: "Logo", component: Logo },
  { path: "/Redefinir", name: "Redefinir", component: Redefinir },

  { path: "/Home",  name: "Home", component: Home},
  { path: "/Perfil", name: "Perfil", component: Perfil },
  { path: "/CriarTopico", name: "CriarTopico", component: CriarTopico },
  { path: "/CriarQuestao", name: "CriarQuestao", component: CriarQuestao },
  { path: "/CriarProva", name: "CriarProva", component: CriarProva },
  {
    path: "/questao-detalhes/:id",
    name: "QuestaoDetalhes",
    component: QuestaoDetalhes,
    props: true,
  },
  { path: "/telaConfim", name: "telaConfim", component: telaConfim },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
