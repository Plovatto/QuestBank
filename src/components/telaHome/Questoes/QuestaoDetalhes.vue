<template>
  <div>
    <br><br><br>
    <Nav />
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
        
          <img v-if="questao.Enunciado_imagem" :src="questao.Enunciado_imagem"  class="mt-7" alt="Imagem do Enunciado" width="300"/>
        </v-card-text>
<br><br>
        <v-row justify="center">
          <v-col cols="auto" class="mb-2">
            <v-btn class="bg-blue" elevation="2" rounded="xl" max-width="200" width="100%" height="40" >    
              <router-link v-if="questao" :to="`/editar-questao/${questao.id_questao}`" class="bg-blue" elevation="2"
    rounded="xl" max-width="500" width="100%" height="40" style="text-decoration: none;">Editar</router-link>
</v-btn>
          </v-col>
          <v-col cols="auto" class="mb-2">
            <v-btn class="bg-red" elevation="2" rounded="xl" max-width="200" width="100%" height="40" @click="deleteQuestao">Excluir</v-btn>
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
      id_questao: null,
      questao: null,
    };
  },
  async mounted() {
    this.id_questao = this.$route.params.id;
    await this.fetchQuestao();
  },
  methods: {
    async fetchQuestao() {
      try {
        const response = await axios.get(`http://localhost:3000/questao/listar/${this.id_questao}`);
        if (response.data.status === "success") {
          this.questao = response.data.questao;
        } else {
          console.error("Erro", response.data.msg);
        }
      } catch (error) {
        console.error("Erro", error);
      }
    },
    async deleteQuestao() {
      try {
        const response = await axios.delete(`http://localhost:3000/questao/deletar/${this.id_questao}`);
        if (response.data.status === "success") {
          this.$router.push('/telaConfimExcluir');
        } else {
          console.error("Erro ao excluir a questão", response.data.msg);
          this.$router.push('/telaErro');
        }
      } catch (error) {
        console.error("Erro ao excluir a questão", error);
      }
    },
   
  },
};
</script>
