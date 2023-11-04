<template>
  <Nav />
  <v-container class="mt-8"><br>
    <v-card elevation="0">
      <v-card-title class="text-blue font-weight-bold text-center text-hg">Adicionar Alternativa</v-card-title>
      <br>
      <v-card-text>
        <v-form ref="form" @submit.prevent="adicionarAlternativa">
          <label>Questão </label> <add />
          <select class="custom-select mt-2" id="questao" name="questao" v-model="questaoSelecionada">
            <option value="">Selecione uma questão</option>
            <option v-for="questao in questoes" :value="questao.id_questao">{{ questao.enunciado }}</option>
          </select>
          <br><br>
          <label>Enunciado da Alternativa</label>
          <v-textarea placeholder="Exemplo: a) 2 + 2 = 4" class="mt-3" rows="2" row-height="20" variant="solo" v-model="enunciadoAlternativa"></v-textarea>
          <v-checkbox color="success" v-model="correta" label="Marque se for a alternativa correta" class="pr-0" true-value="true" false-value="false"></v-checkbox>
          <br>
          
         
        </v-form>
        <v-alert v-if="showError" type="error" class="mt-3">{{ errorMessage }}</v-alert>
      </v-card-text>
      <v-card-actions class="d-flex justify-center flex-column align-itens-center">
        <v-btn :height="50" :width="240" class="bg-blue rounded-pill text-h6" @click="adicionarAlternativa">Salvar</v-btn> 
        <br><v-btn :height="50" :width="240" class="bg-red rounded-pill text-h6" @click="limparCampos">Limpar Campos</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import Nav from '@/components/Nav.vue';
import add from "@/components/telaHome/Questoes/addQuestao.vue";
export default defineComponent({
  components: {
    Nav,add
  },
  setup() {
    const questaoSelecionada = ref(null);
    const questoes = ref([]);
    const enunciadoAlternativa = ref('');
    const correta = ref(false);
    const route = useRoute();
    const router = useRouter();
    const showError = ref(false);
    const errorMessage = ref('');


    const saveFormDataToLocalStorage = () => {
      const formData = {
        questaoSelecionada: questaoSelecionada.value,
        enunciadoAlternativa: enunciadoAlternativa.value,
        correta: correta.value,
      };
      localStorage.setItem('alternativa_form_data', JSON.stringify(formData));
    };

    
    watch([questaoSelecionada, enunciadoAlternativa, correta], () => {
     
      saveFormDataToLocalStorage();
    });

    
    const formDataFromLocalStorage = localStorage.getItem('alternativa_form_data');
    if (formDataFromLocalStorage) {
      const formData = JSON.parse(formDataFromLocalStorage);
      questaoSelecionada.value = formData.questaoSelecionada;
      enunciadoAlternativa.value = formData.enunciadoAlternativa;
      correta.value = formData.correta;
    }

    const carregarQuestoes = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`https://api-quest-bank.vercel.app/questao/listar/?idProfessor=${userId}`);
        questoes.value = response.data.questoes;
      } catch (error) {
        console.error('Erro ao carregar questões:', error);
      }
    };

    onMounted(() => {
      carregarQuestoes();
    });


    const limparCampos = () => {
      questaoSelecionada.value = null;
      enunciadoAlternativa.value = '';
      correta.value = false;
    };

    const adicionarAlternativa = async () => {
      if (questaoSelecionada && enunciadoAlternativa && correta !== null) {
        const formData = {
          id_questao: questaoSelecionada,
          enunciado: enunciadoAlternativa,
          correta: correta,
        };

        try {
          const response = await axios.post('https://api-quest-bank.vercel.app/alternativa/adicionar', formData);
          console.log('Alternativa criada:', response.data);

      
          localStorage.removeItem('alternativa_form_data');

          
          limparCampos();
        } catch (error) {
          console.error('Erro ao criar alternativa:', error);
        }
      } else {
        errorMessage.value = 'Por favor, preencha todos os campos obrigatórios.';
        showError.value = true;
        setTimeout(() => {
          showError.value = false;
          errorMessage.value = '';
        }, 3000);
      }
    };

    return {
      questaoSelecionada,
      questoes,
      enunciadoAlternativa,
      correta,
      adicionarAlternativa,
      limparCampos,
      showError,
      errorMessage,
    };
  },
});
</script>

<style>
option {
  color: #3f3f3f;
}

.custom-select {
  width: 100%;
  height: 55px;
  padding: 8px;
  font-size: 16px;
  border: 0.4px groove #eeeeee;
  border-radius: 4px;
  background-color: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(4, 4, 3, 0.25);
  color: #9c9c9c;
  cursor: pointer;
}

.custom-select:focus {

  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px #007bff;
}
</style>
