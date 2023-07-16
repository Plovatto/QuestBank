<template>
  
  <v-app-bar flat >
    <img height="30" src="../assets/logo.svg" class="ml-8">
    <v-app-bar-title class="  text-blue text-h5 font-weight-bold">
      Quest Bank
    </v-app-bar-title>
    <template v-slot:append>
     
     
      
    </template>
  </v-app-bar> 
  <v-container class="mt-15"></v-container>
  <v-app>
    <v-main>
        <v-container>
    <v-row align="center">
      <v-col cols="6"> 
        <h3 class="ml-8  text-black text-h6 font-weight-bold">Minhas Avaliações</h3>
      </v-col>
      <v-col cols="1" class="d-flex justify-end">
       <addProvas/>
      </v-col>
      <v-col cols="5" class="d-flex justify-end">
<buscaProva/>
      </v-col>
    </v-row>
    
  </v-container>
    <Provas/>

    <v-container class="mt-8">
    <v-row align="center">
      <v-col cols="6"> 
        <h3 class="ml-8 text-black text-h6 font-weight-bold">Minhas Questões</h3>
      </v-col>
      <v-col cols="1" class="d-flex justify-end">
       <addQuestao/>
      </v-col>
      <v-col cols="5" class="d-flex justify-end">
<buscaQuestoes/>
      </v-col>
    </v-row>
    
  </v-container>
    <Questoes/>

    <v-container class="mt-8 ">
    <v-row align="center">
      <v-col cols="6"> 
        <h3 class="ml-8 text-black text-h6 font-weight-bold">Meus Tópicos</h3>
      </v-col>
      <v-col cols="1" class="d-flex justify-end">
       <addTopico/>
      </v-col>
      <v-col cols="5" class="d-flex justify-end">
<buscaTopico/>
      </v-col>
    </v-row>
    
  </v-container>
    <Topicos/>
    <v-container></v-container>  
 </v-main>
  </v-app>
<Nav />
</template>

<script>
  import buscaProva from '@/components/telaHome/Provas/buscaProva.vue';
  import addProvas from '@/components/telaHome/Provas/addProvas.vue';
  import Provas from '@/components/telaHome/Provas/Provas.vue';

  import buscaQuestoes from '@/components/telaHome/Questoes/buscaQuestoes.vue';
  import addQuestao from '@/components/telaHome/Questoes/addQuestao.vue';
  import Questoes from '@/components/telaHome/Questoes/Questoes.vue';

  import Topicos from '@/components/telaHome/Topicos/Topicos.vue';
  import addTopico from '@/components/telaHome/Topicos/addTopico.vue';
  import buscaTopico from '@/components/telaHome/Topicos/buscaTopicos.vue';

  import Nav from '@/components/Nav.vue';

import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({

    setup() {
  const route = useRoute();
  const router = useRouter();

  const close = () => {
    if (route.path !== '/Inicio') {
      router.push('/Inicio');
    }
  };

  return {
    close
  };
}, components: {
  buscaProva,addProvas,Provas,Nav,
  buscaQuestoes,addQuestao,Questoes,
  Topicos,addTopico,buscaTopico,

  },
});
</script>
