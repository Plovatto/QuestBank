<template>
  <div>
    <br><br><br>
    <Nav />
    <v-container class="mt-12">
      <v-card class="mx-auto" max-width="800">
        <v-card-title class="text-blue font-weight-bold">Detalhes do Tópico</v-card-title>
        <br>
        <v-col  v-if="isLoading"  cols="auto" class="mb-2 d-flex justify-center">
        <v-progress-circular v-if="isLoading" indeterminate color="blue"></v-progress-circular>
      </v-col>
        <v-card-text v-if="!isLoading && topico">
        
          <p v-if="topico"><span class="text-blue font-weight-bold">Enunciado:</span> {{ topico.enunciado }}</p>
          <p v-if="topico"><span class="text-blue font-weight-bold">Criado por:</span> {{ topico.usuario.nome_pessoa }}
          </p>
          <p v-if="topico"><span class="text-blue font-weight-bold">Disciplina:</span> {{
            topico.disciplina.nome_disciplina }}</p>
        </v-card-text>
        <br>
        <v-row justify="center">
          <v-col cols="auto" class="mb-2">
            <v-btn v-if="idAtual == idCriador"  class="bg-blue" elevation="2" rounded="xl" max-width="500" width="100%" height="40">
              <router-link v-if="topico" :to="'/editar-topico/' + topico.id_topico" class="bg-blue" elevation="2"
                rounded="xl" max-width="500" width="100%" height="40"
                style="color: #fff; text-decoration: none;">Editar</router-link>
            </v-btn>
          </v-col>
          <v-col cols="auto" class="mb-2">
            <v-btn v-if="idAtual == idCriador"  class="bg-red" elevation="2" rounded="xl" max-width="500" width="100%" height="40"
              @click="confirmarExclusao(topico ? topico.id_topico : null)">Excluir</v-btn>
            <br><br></v-col>
        </v-row>
      </v-card>
    </v-container>
    <v-dialog v-model="dialogExclusao" max-width="500">
      <v-card>
        <v-card-title class="mt-3 ml-2 text-h5 text-blue">Confirmar exclusão</v-card-title>
        <v-card-text>
          Tem certeza que deseja excluir este tópico?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogExclusao = false">Não</v-btn>
          <v-btn color="blue darken-1" text @click="excluirTopico(topico.id_topico)">Sim</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
      dialogExclusao: false,
      isLoading: true,
      userId: localStorage.getItem('userId'),
    };
  },
  async mounted() {
    this.topicId = this.$route.params.id;
    await this.fetchTopicDetails();
  },
  methods: {
    async fetchTopicDetails() {
      try {
        const response = await axios.get(`https://api-quest-bank.vercel.app/topico/listar/${this.topicId}`);
        if (response.data.status === 'success') {
          this.topico = response.data.topico;
          this.isLoading = false;
          this.idAtual = this.userId;
      if (this.topico.usuario) {
        this.idCriador = this.topico.usuario.id_pessoa;
      }
      console.log(this.idAtual);
      console.log(this.idCriador);
        } else {
          console.error('Erro', response.data.msg);
        }
      } catch (error) {
        console.error('Erro', error);
      }
    },
    confirmarExclusao(idTopico) {
      this.topico.id_topico = idTopico;
      this.dialogExclusao = true;
    },
    async excluirTopico(idTopico) {
      try {
        const response = await axios.delete(`https://api-quest-bank.vercel.app/topico/deletar/${idTopico}`);
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
