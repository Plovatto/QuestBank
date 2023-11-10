<template>
  <Nav />
  <br>
  <v-container class="mt-8">
    <v-card elevation="0">
      <v-card-title class="text-blue font-weight-bold text-center text-h6">Adicionar Prova</v-card-title>
      <v-card-text>
        <v-form ref="form" @submit="prova">

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
         
            <label>Questões</label>
            <add />

            <br>
            <div>
<br>

    <v-combobox variant="solo" v-model="selectedQuestoes" :items="questoes" :item-text="itemText" item-value="id_questao" label="Selecione as questões" multiple></v-combobox>
   
    <div v-if="selectedQuestoes.length > 0"> 
      <div class="elevation-2" style="border: solid 1px #e6e6e6; padding: 8px; height: auto;">
      <br><label class="ml-3 text-blue font-weight-bold ">Questões adicionadas:</label><br>
      <br>
      <ol class="ml-7">
        <li class="mb-4" v-for="questao in selectedQuestoes" :key="questao">{{ questao }}</li>
      </ol><br>
    </div></div><br>
  </div>
        </v-form>
        <v-alert v-if="showError" type="error" class="mt-3">{{ errorMessage }}</v-alert>
      </v-card-text>
      <v-card-actions class="d-flex justify-center flex-column align-items-center">
        <v-btn :height="50" :width="240" class="bg-blue rounded-pill text-h6" @click="prova">Salvar</v-btn>
        <br><v-btn :height="50" :width="240" class="bg-red rounded-pill text-h6" @click="limparCampos">Limpar Campos</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import Nav from "@/components/Nav.vue";
import { defineComponent, ref, watch } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import add from "@/components/telaHome/Questoes/addQuestao.vue";
export default defineComponent({
  components: {
    Nav, add
  },
  setup() {

    const enunciado = ref('');
    const tipo = ref('');
    const descricao = ref('');
    const professorId = localStorage.getItem('userId');
    const route = useRoute();
    const router = useRouter();
    const showError = ref(false);
    const errorMessage = ref('');
    const questoes = ref([
      { enunciado: 'Questão 1', id_questao: 1 },
      { enunciado: 'Questão 2', id_questao: 2 },
    
    ]);
    const selectedQuestoes = ref([]);

    const limparCampos = () => {
      enunciado.value = '';
      tipo.value = '';
      descricao.value = '';
      selectedQuestoes.value = [];
    };
    const itemText = (item) => {
  if (typeof item === 'object' && item !== null && 'enunciado' in item) {
    return item.enunciado;
  }
  return item;
};
    const saveFormDataToLocalStorage = () => {
      const formData = {
        enunciado: enunciado.value,
        tipo: tipo.value,
        descricao: descricao.value,
        questoes: selectedQuestoes.value,
      };
      localStorage.setItem('prova_form_data', JSON.stringify(formData));
    };

    watch([enunciado, tipo, descricao, selectedQuestoes], () => {

      saveFormDataToLocalStorage();
    });
    const formDataFromLocalStorage = localStorage.getItem('prova_form_data');
    if (formDataFromLocalStorage) {
      const formData = JSON.parse(formDataFromLocalStorage);
      enunciado.value = formData.enunciado;
      tipo.value = formData.tipo;
      descricao.value = formData.descricao;
      selectedQuestoes.value = formData.questoes;
    }
    const criarProva = async () => {
  const enunciadosDasQuestoes = selectedQuestoes.value.map(questao => questao);

  const formData = {
    enunciado: enunciado.value,
    tipo: tipo.value,
    descricao: descricao.value,
    professorId: professorId,
    questoes: enunciadosDasQuestoes
  };

  try {
    const response = await axios.post('https://api-quest-bank.vercel.app/prova/adicionar', formData);
    console.log('Prova criada:', response.data);

    limparCampos();

    localStorage.removeItem('prova_form_data');

    if (route.path !== '/telaConfim') {
      router.push('/telaConfim');
    } else {
      router.push('/telaErro');
    }
  } catch (error) {
    console.error('Erro ao criar prova:', error);
  }
};

    const prova = () => {
      if (descricao.value && enunciado.value && tipo.value) {
        criarProva();
      } else {
        errorMessage.value = 'Por favor, preencha todos os campos obrigatórios.';
        showError.value = true;
        setTimeout(() => {
          showError.value = false;
          errorMessage.value = '';
        }, 3000);
      }
    };

const carregarQuestoes = async () => {
  try {
    
    const response = await axios.get(`https://api-quest-bank.vercel.app/questoes/listar/`);
    questoes.value = response.data.questoes.map(questao => questao.enunciado);
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
      questoes,
      showError,
      errorMessage,
      limparCampos, questoes,
      selectedQuestoes, itemText,
    };
  },
});
</script>

<style>
.custom-select2 {
background-color: #0099ff;

}
</style>
