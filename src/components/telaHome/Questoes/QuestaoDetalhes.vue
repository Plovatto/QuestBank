<template>
  <div>
    <br><br><br>
    <Nav/>
    <v-container class="mt-12">
      <v-card class="mx-auto" max-width="800" v-if="questao">
        <v-card-title class="text-blue font-weight-bold">Detalhes da Questão</v-card-title>
        <v-card-text>
          <p><span class="text-blue font-weight-bold">ID da Questão:</span> {{ questao.id_questao }}</p>
          <p><span class="text-blue font-weight-bold">Enunciado:</span> {{ questao.enunciado }}</p>
          <p><span class="text-blue font-weight-bold">Tipo:</span> {{ questao.tipo }}</p>
          <p><span class="text-blue font-weight-bold">Nível:</span> {{ questao.nivel }}</p>
          <p><span class="text-blue font-weight-bold">Resposta:</span> {{ questao.resposta }}</p>
          <p><span class="text-blue font-weight-bold">Professor:</span> {{ questao.professor.professor_nome }}</p>
          <p><span class="text-blue font-weight-bold">Tópico:</span> {{ questao.topico.topico_enunciado }}</p>
        </v-card-text>

        <v-row justify="center">
          <v-col cols="auto" class="mb-2">
            <v-btn class="bg-blue" elevation="2" rounded="xl" max-width="200" width="100%" height="40">Excluir</v-btn>
          </v-col>
          <v-col cols="auto" class="mb-2">
            <v-btn class="bg-blue" elevation="2" rounded="xl" max-width="200" width="100%" height="40">Editar</v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>
<script>
import Nav from '@/components/Nav.vue';
import axios from 'axios'; 

export default {
  components: {
    Nav,
  },
  data() {
    return {
      questaoId: null,
      questao: null,
    };
  },
 async mounted() {
    this.questaoId = this.$route.params.id;
    await this.fetchQuestao();
  },
   
  
  methods: {
    async fetchQuestao() {
      try {
        const response = await axios.get(`https://questbankapi.onrender.com/obterQuestao/${this.questaoId}`); 
        if (response.data.status === "success") {
          this.questao = response.data.questao;
        } else {
          console.error("Erro", response.data.msg);
        }
      } catch (error) {
        console.error("Erro", error);
      }
    },
  },
};
</script>