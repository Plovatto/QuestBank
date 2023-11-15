<template>
  <div>
    <br /><br />
    <Nav />
    <v-container>
      <v-card class="mx-auto" max-width="800">
        <v-card-title class="text-blue font-weight-bold mt-5">Detalhes da Prova</v-card-title>
        <v-col cols="auto" class="mb-2 d-flex justify-center">
            <v-progress-circular v-if="isLoading" indeterminate color="blue"></v-progress-circular>
          </v-col>
        <v-card-text v-if="!isLoading && prova">

          <p><span class="text-blue font-weight-bold">Nome da Prova:</span> {{ prova.enunciado }}</p>
          <p class="mt-2"><span class="text-blue font-weight-bold">Criado por:</span> {{ prova.criado_por.professor_nome }}</p>
          <p class="mt-2"><span class="text-blue font-weight-bold">Descrição:</span> {{ prova.descricao }}</p>
 
          <br>
         <p class="mt-2"><span class="text-blue font-weight-bold ">Questões:</span></p><br>
         <hr>
          <div v-for="(questao, index) in prova.questoes" :key="questao.questao_id">
  <br>            <v-expansion-panels variant="accordion">
  <v-expansion-panel>
  <v-expansion-panel-title class="text-blue-darken-2"> {{ questao.questao_enunciado }}
    
    <template v-slot:actions="{ expanded }">
      <router-link :to="`/questao-detalhes/${questao.questao_id}`">
      
          <v-icon
          end
          color="blue"
          icon="mdi-file-edit-outline"
        ></v-icon>
      
      </router-link>
    </template>
  </v-expansion-panel-title>
        <v-expansion-panel-text>
    
           <p class="mt-2" v-if="questao.questao_tipo === 'Dissertativa'"> <span class="text-blue font-weight-bold">Resposta:</span>
    {{ questao.questao_resposta ? questao.questao_resposta : 'Nenhuma resposta fornecida' }}
  </p>
  <p class="mt-2"><span class="text-blue font-weight-bold">Tipo:</span> {{ questao.questao_tipo }}</p>
  <p class="mt-2"><span class="text-blue font-weight-bold">Nível:</span> {{ displayNivelComAcento(questao.questao_nivel) }}</p>

  <p v-if="questao.topicos">
    <p v-if="questao.topicos.disciplina">
      <p class="mt-2"><span class="text-blue font-weight-bold">Disciplina:</span> {{ questao.topicos.disciplina.questao_topico_disciplina_nome }}</p>
      <p class="mt-2"><span class="text-blue font-weight-bold">Tópico:</span> {{ questao.topicos.questao_topico_enunciado }}</p>
    </p>
  </p><br>
  <p class="mt-2"><span class="text-blue font-weight-bold " v-if="questao.questao_tipo === 'Objetiva'">Alternativas</span></p>
  <p class="mt-2" v-for="(alternativa, index) in questao.alternativas" :key="alternativa.id_alternativa">
   
    <span class="font-weight-bold text-blue">{{ String.fromCharCode(97 + index) }})</span> {{ alternativa.enunciado }}
    <span v-if="alternativa.correta === 1"> (Correta)</span>
  </p><br>

        </v-expansion-panel-text>
      </v-expansion-panel></v-expansion-panels>
 
  
</div>
        </v-card-text>
<br>
        <v-row justify="center">
          <v-col cols="auto" class="mb-2">
            <v-btn
            v-if="prova && prova.id_prova && idAtual == idCriador"
    class="bg-blue text-white"
    elevation="2"
    rounded="xl"
    max-width="200"
    width="100%"
    height="40"
  >
    <router-link :to="`/editar-provas/${prova.id_prova}`" style="color: #fff; text-decoration: none;">Editar</router-link>
  </v-btn>
          </v-col>
          <v-col cols="auto" class="mb-2">
            <v-btn
            v-if="prova && prova.id_prova && idAtual == idCriador"
            
    class="bg-red"
    elevation="2"
    rounded="xl"
    max-width="200"
    width="100%"
    height="40"
    @click="confirmarExclusao(prova ? prova.id_prova : null)"
  >
    Excluir
  </v-btn>          </v-col>
        </v-row>
      <br>
      </v-card> 
      <br><v-row justify="center"> 
        <v-col cols="auto">
          <v-btn class="bg-green" elevation="2" rounded="xl" min-width="210" width="100%" height="40" >
            <a v-if="prova && prova.id_prova" class="bg-green" style="text-decoration: none;" elevation="2" rounded="xl" min-width="210" width="100%" height="40" :href="`https://api-questbankv2.onrender.com/prova/download/${prova.id_prova}`">Gerar PDF</a>
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
      userId: localStorage.getItem('userId'),
    };
  },
  mounted() {
    this.id_prova = this.$route.params.id;
    this.carregarDetalhesProva();
  },
  methods: {    

    
    displayNivelComAcento(nivel) {
    switch (nivel) {
      case 'facil':
        return 'Fácil';
      case 'medio':
        return 'Médio';
      case 'dificil':
        return 'Difícil';
      default:
        return nivel;
    }
  },
    async carregarDetalhesProva() {
      try {
    
        const response = await axios.get(`https://api-quest-bank.vercel.app/prova/listar/${this.id_prova}`);
        if (response.data.status === 'success') {
          this.prova = response.data.prova;
          this.isLoading = false;    
          this.idAtual = this.userId;
      if (this.prova.criado_por) {
        this.idCriador = this.prova.criado_por.professor_pessoa_id_pessoa;
      }
      console.log(this.idAtual);
      console.log(this.idCriador);
        } else {
          console.error('Erro ao carregar detalhes da prova:', response.data.msg);
        }
      } catch (error) {
        console.error('Erro ao carregar detalhes da prova:', error);
      }
    },confirmarExclusao(idProva) {
  if (this.prova) {
    this.prova.id_prova = idProva;
    this.dialogExclusao = true;
  } else {
    console.error('this.prova is null');
  }
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