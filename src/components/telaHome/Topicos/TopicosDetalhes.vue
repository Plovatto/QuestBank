<template>
  <div>
    <br><br><br>
    <Nav />
    <v-container class="mt-12">
      <v-card class="mx-auto" max-width="800">
        <v-card-title class="text-blue font-weight-bold">Detalhes do Tópico</v-card-title>
        <v-card-text v-if="topico">
          <p v-if="topico"><span class="text-blue font-weight-bold">ID do Tópico:</span> {{ topico.id_topico }}</p>
          <p v-if="topico"><span class="text-blue font-weight-bold">Enunciado:</span> {{ topico.enunciado }}</p>
          <p v-if="topico"><span class="text-blue font-weight-bold">Criado por:</span> {{ topico.usuario.nome_pessoa }}</p>
          <p v-if="topico"><span class="text-blue font-weight-bold">Disciplina:</span> {{ topico.disciplina.nome_disciplina }}</p>
        </v-card-text>
        <br>
        <v-row justify="center">
          <v-col cols="auto" class="mb-2">
            <v-btn class="bg-blue" elevation="2" rounded="xl" max-width="500" width="100%" height="40">
              <router-link v-if="topico" :to="'/editar-topico/' + topico.id_topico" class="bg-blue" elevation="2" rounded="xl"
                max-width="500" width="100%" height="40" style="text-decoration: none;">Editar</router-link>
            </v-btn>
          </v-col>
          <v-col cols="auto" class="mb-2">
            <v-btn class="bg-red" elevation="2" rounded="xl" max-width="500" width="100%" height="40"
              @click="excluirTopico(topico ? topico.id_topico : null)">Excluir</v-btn>
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
      topicId: null,
      topico: null,
    };
  },
  async mounted() {
    this.topicId = this.$route.params.id;
    await this.fetchTopicDetails();
  },
  methods: {
    async fetchTopicDetails() {
      try {
        const response = await axios.get(`http://localhost:3000/topico/listar/${this.topicId}`);
        if (response.data.status === 'success') {
          this.topico = response.data.topico;
        } else {
          console.error('Erro', response.data.msg);
        }
      } catch (error) {
        console.error('Erro', error);
      }
    },
    async excluirTopico(idTopico) {
      try {
        const response = await axios.delete(`https://questbankapi.onrender.com/excluirTopico/${idTopico}`);
        if (response.data.status === 'success') {
          console.log("Excluir Tópico")
          this.$router.push('/telaConfimExcluir');
        } else {
          console.error('Erro', response.data.msg);
          this.$router.push('/telaErro');
        }
      } catch (error) {
        console.error('Erro', error);
      }
    },
  },
};
</script>
