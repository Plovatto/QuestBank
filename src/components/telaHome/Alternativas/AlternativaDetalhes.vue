<template>
  <div>
    <Nav />
    <v-container class="mt-5">
      <v-card class="mx-auto" max-width="800">
        <v-card-title class="text-blue font-weight-bold mt-8">Detalhes da Alternativa</v-card-title>
        <v-col v-if="!isLoading && alternativa" cols="auto" class="mb-2 d-flex justify-center"> <v-progress-circular v-if="isLoading" indeterminate color="blue"></v-progress-circular>
          </v-col>
        <v-card-text v-if="!isLoading && alternativa">
   
          <p><span class="text-blue font-weight-bold">Enunciado:</span> {{ alternativa.enunciado }}</p>
          <p class="mt-2"><span class="text-blue font-weight-bold">Correta:</span> {{ alternativa.correta === 1 ? 'Sim' : 'Não' }}</p>
          <br> <p class="mt-2"> <span class="text-blue font-weight-bold">Disciplina:</span> {{ alternativa.questao.topico.disciplina.nome }}
            <p class="mt-2"><span class="text-blue font-weight-bold">Tópico da Questão:</span> {{ alternativa.questao.topico.enunciado }}</p>
          <p class="mt-2"><span class="text-blue font-weight-bold">Questão Associada:</span> {{ alternativa.questao.enunciado }}</p> 
         
          <p class="mt-2"><span class="text-blue font-weight-bold">Nível da Questão:</span> {{ displayNivelComAcento(alternativa.questao.nivel) }}</p>
          <p class="mt-2"><span class="text-blue font-weight-bold">Tipo da Questão:</span> {{ alternativa.questao.tipo }}</p>
          
         
          </p>
        
        </v-card-text>
<br><br>
        <v-row justify="center">
          <v-col cols="auto" class="mb-2">
            <v-btn v-if="idAtual == idCriador"  class="bg-blue text-white" elevation="2" rounded="xl" max-width="200" width="100%" height="40">
              <router-link v-if="alternativa" :to="`/editar-alternativas/${alternativa.id_alternativa}`"
                style="color: #fff; text-decoration: none;">Editar</router-link>
            </v-btn>
          </v-col>
          <v-col cols="auto" class="mb-2">
            <v-btn v-if="idAtual == idCriador"  class="bg-red" elevation="2" rounded="xl" max-width="200" width="100%" height="40"
              @click="excluirAlternativa(alternativa.id_alternativa)">
              Excluir
            </v-btn><br><br>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import axios from 'axios';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  components: {
    Nav,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const id_alternativa = ref(null);
    const alternativa = ref(null);


    const carregarDetalhesAlternativa = async () => {
  try {
    id_alternativa.value = route.params.id;
    const response = await axios.get(`https://api-quest-bank.vercel.app/alternativa/listar/${id_alternativa.value}`);
    if (response.data.status === 'success') {
      alternativa.value = response.data.alternativa;
      this.idAtual = this.userId;
      if (this.topico.usuario) {
        this.idCriador = this.topico.usuario.id_pessoa;
      }
      console.log(this.idAtual);
      console.log(this.idCriador);
    } else {
      console.error('Erro ao carregar detalhes da alternativa:', response.data.msg);
    }
  } catch (error) {
    console.error('Erro ao carregar detalhes da alternativa:', error);
  } finally {
    isLoading.value = false;
  }
};

const excluirAlternativa = async (alternativaId) => {
  try {
    const response = await axios.delete(`https://api-quest-bank.vercel.app/alternativa/deletar/${alternativaId}`);
    if (response.data.status === 'success') {
      router.push('/telaConfimExcluir');
    } else {
      console.error('Erro ao excluir a prova:', response.data.msg);
      router.push('/telaErro');
    }
  } catch (error) {
    console.error('Erro ao excluir a prova:', error);
  } finally {
    isLoading.value = false;
  }
};
    onMounted(() => {
      carregarDetalhesAlternativa();
    });

    return {
      alternativa,
      excluirAlternativa,
      userId: localStorage.getItem('userId'),
    };
  },  methods: {
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
  }
  },  
};
</script>
