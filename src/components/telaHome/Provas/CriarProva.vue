<template>
  <Nav />
  <br>
  <v-container class="mt-8">
    <v-card elevation="0">
      <v-card-title class="text-blue font-weight-bold text-center text-h5">Adicionar Prova</v-card-title>
      <v-card-text>
        <v-form ref="form" @submit="criarProva">
          <div>
            <label>Questões</label>
            <br>
            <select class="custom-select2 mt-3" v-model="selectedQuestoes" multiple>
              <option v-for="questao in questoes" :value="questao">{{ questao.enunciado }}</option>
            </select>
          </div>
          <br><br>
          <label>Nome da prova</label>
          <v-textarea placeholder="Exemplo: Prova 1" class="mt-3" rows="2" row-height="20" variant="solo"
            v-model="enunciado"></v-textarea>
          <label>Tipo</label>
          <v-select class="mt-3" label="Selecione o tipo" v-model="tipo" :items="['Objetiva', 'Dissertativa', 'Ambas']"
            variant="solo"></v-select>
          <label>Descrição</label>
          <v-textarea placeholder="Exemplo: Prova do 3° ano segundo trimestre" class="mt-3" rows="2" row-height="20"
            variant="solo" v-model="descricao"></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-center align-items-center">
        <v-btn :height="50" :width="240" class="bg-blue rounded-pill text-h6" @click="prova">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import Nav from "@/components/Nav.vue";
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
  components: {
    Nav,
  },
  setup() {
    const selectedQuestoes = ref([]);
    const questoes = ref([]);
    const enunciado = ref('');
    const tipo = ref('');
    const descricao = ref('');
    const professorId = localStorage.getItem('userId');
    const route = useRoute();
    const router = useRouter();

    const criarProva = async () => {
      const idsDasQuestoes = selectedQuestoes.value.map(questao => questao.id_questao);

      const formData = {
        enunciado: enunciado.value,
        tipo: tipo.value,
        descricao: descricao.value,
        professorId: professorId,
        questoes: idsDasQuestoes,
      };

      try {
        const response = await axios.post('https://api-quest-bank.vercel.app/prova/adicionar', formData);
        console.log('Prova criada:', response.data);
      } catch (error) {
        console.error('Erro ao criar prova:', error);
      }
    };


    const prova = () => {
      if (route.path !== '/telaConfim') {
        criarProva();
        router.push('/telaConfim');
      } else {
        router.push('/telaErro');
      }
    };

    const carregarQuestoes = async () => {
      try {
        const response = await axios.get('https://api-quest-bank.vercel.app/questao/listar');
        questoes.value = response.data.questoes;
      } catch (error) {
        console.error('Erro ao carregar questões:', error);
      }
    };

    carregarQuestoes();

    return {
      selectedQuestoes,
      enunciado,
      tipo,
      descricao,
      professorId,
      prova,
      criarProva,
      questoes,
    };
  },
});
</script>
<style>
.custom-select2 {
  width: 100%;
  height: 125px;
  padding: 8px;
  font-size: 16px;
  border: 0.4px groove #eeeeee;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(4, 4, 3, 0.25);
  color: #9c9c9c;
  cursor: pointer;
}
</style> 