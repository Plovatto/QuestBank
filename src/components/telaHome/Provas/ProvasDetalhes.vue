<template>
  <div>
    <br /><br />
    <Nav />
    <v-container>
      <v-card class="mx-auto" max-width="800">
        <v-card-title class="text-blue font-weight-bold">Detalhes da Prova</v-card-title>
        <v-col cols="auto" class="mb-2 d-flex justify-center">
            <v-progress-circular v-if="isLoading" indeterminate color="blue"></v-progress-circular>
          </v-col>
        <v-card-text v-if="!isLoading && prova">
          <p><span class="text-blue font-weight-bold">ID da Prova:</span> {{ prova.id_prova }}</p>
          <p><span class="text-blue font-weight-bold">Nome da Prova:</span> {{ prova.enunciado }}</p>
          <p><span class="text-blue font-weight-bold">Criado por:</span> {{ prova.criado_por.professor_nome }}</p>
          <p><span class="text-blue font-weight-bold">Descrição:</span> {{ prova.descricao }}</p>

          <br>
         <p><span class="text-blue font-weight-bold">Questões:</span></p>
          <p v-for="questao in prova.questoes" :key="questao.questao_id">
  <br> 
  <p><span class="text-blue font-weight-bold">Enunciado:</span> {{ questao.questao_enunciado }}</p>
  <p><span class="text-blue font-weight-bold">Resposta:</span> {{ questao.questao_resposta }}</p>
  <p><span class="text-blue font-weight-bold">Tipo:</span> {{ questao.questao_tipo }}</p>
  <p><span class="text-blue font-weight-bold">Nível:</span> {{ questao.questao_nivel }}</p>
  <p v-if="questao.topicos">
    <p v-if="questao.topicos.disciplina">
      <p><span class="text-blue font-weight-bold">Disciplina:</span> {{ questao.topicos.disciplina.questao_topico_disciplina_nome }}</p>
      <p><span class="text-blue font-weight-bold">Tópico:</span> {{ questao.topicos.questao_topico_enunciado }}</p>
    </p>
  </p>
  <img v-if="questao.questao_enunciado_imagem" :src="questao.questao_enunciado_imagem" class="mt-7" alt="Imagem do Enunciado" :width="300" />
</p>
        </v-card-text>
<br>
        <v-row justify="center">
          <v-col cols="auto" class="mb-2">
            <v-btn class="bg-blue text-white"  elevation="2" rounded="xl" max-width="200" width="100%" height="40">
              <router-link v-if="prova" :to="`/editar-provas/${prova.id_prova}`" style="color: #fff; text-decoration: none;">Editar</router-link>
            </v-btn>
          </v-col>
          <v-col cols="auto" class="mb-2">
            <v-btn class="bg-red" elevation="2" rounded="xl" max-width="200" width="100%" height="40"  @click="confirmarExclusao(prova ? prova.id_prova : null)">Excluir</v-btn>
          </v-col>
        </v-row>
      <br>
      </v-card> 
      <br><v-row justify="center"> 
        <v-col cols="auto">
          <v-btn class="bg-green" elevation="2" rounded="xl" min-width="210" width="100%" height="40" >
            <a v-if="prova && prova.id_prova" class="bg-green" style="text-decoration: none;" elevation="2" rounded="xl" min-width="210" width="100%" height="40" :href="`https://api-quest-bank.vercel.app/prova/download/${prova.id_prova}`">Gerar PDF</a>
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="dialogExclusao" max-width="500">
      <v-card>
        <v-card-title class="mt-3 ml-2 text-h5 text-blue">Confirmar exclusão</v-card-title>
        <v-card-text>
          Tem certeza que deseja excluir essa prova?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogExclusao = false">Não</v-btn>
          <v-btn color="blue darken-1" text @click="excluirProva(prova.id_prova)">Sim</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import axios from 'axios';
//https://api-questbankv2.onrender.com
export default {
  components: {
    Nav,
  },
  data() {
    return {
      id_prova: null,
      prova: null,
      dialogExclusao: false,
      isLoading: true,
    };
  },
  mounted() {
    this.id_prova = this.$route.params.id;
    this.carregarDetalhesProva();
  },
  methods: {
    async carregarDetalhesProva() {
      try {
        const response = await axios.get(`https://api-quest-bank.vercel.app/prova/listar/${this.id_prova}`);
        if (response.data.status === 'success') {
          this.prova = response.data.prova;
          this.isLoading = false;
        } else {
          console.error('Erro ao carregar detalhes da prova:', response.data.msg);
        }
      } catch (error) {
        console.error('Erro ao carregar detalhes da prova:', error);
      }
    },confirmarExclusao(idProva) {
      this.prova.id_prova = idProva;
      this.dialogExclusao = true;
    },
    async excluirProva(provaId) {
      try {
        const response = await axios.delete(`https://api-quest-bank.vercel.app/prova/deletar/${provaId}`);
        if (response.data.status === 'success') {
          this.$router.push('/telaConfimExcluir');
        } else {
          console.error('Erro ao excluir a prova:', response.data.msg);
          this.$router.push('/telaErro');
        }
      } catch (error) {
        console.error('Erro ao excluir a prova:', error);
      }
    },
    async gerarPDF(provaId) {
      try {
        const response = await axios.get(`https://api-questbankv2.onrender.com/prova/download/${provaId}`);
        if (response.data.status === 'success') {
          window.open(response.data.url, '_blank');
        } else {
          console.error('Erro ao gerar PDF da prova:', response.data.msg);
        }
      } catch (error) {
        console.error('Erro ao gerar PDF da prova:', error);
      }
    },
  },
};
</script>