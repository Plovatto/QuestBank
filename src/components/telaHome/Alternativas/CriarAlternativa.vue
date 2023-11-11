<template>
  <Nav />
  <v-container class="mt-8"><br>
    <v-card elevation="0">
      <v-card-title class="text-blue font-weight-bold text-center text-hg">Adicionar Alternativa</v-card-title>
      <br>
      <v-card-text>

        <v-form ref="form" @submit="criarAlternativa">
          <label>Questão</label>
          <select class="custom-select mt-2" id="questao" name="questao" v-model="enunciadoQuestao">
            <option value="">Selecione uma questao</option>
            <option v-for="questao in questoes" :value="{ id_questao: questao.id_questao, enunciado: questao.enunciado }">
              {{ questao.enunciado
              }}</option>
          </select>
          <br><br>
          <label>Enunciado da Alternativa</label>
          <v-textarea placeholder="Exemplo: a) 2 + 2 = 4" class="mt-3" rows="2" row-height="20" variant="solo"
            v-model="enunciado"></v-textarea>
          <v-checkbox color="success" v-model="correta" label="Marque se for a alternativa correta" class="pr-0"
            true-value="1" false-value="0"></v-checkbox>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-center flex-column align-itens-center">
        <v-btn :height="50" :width="240" class="bg-blue rounded-pill text-h6" @click="adicionarAlternativa">Salvar</v-btn>
        <br><v-btn :height="50" :width="240" class="bg-red rounded-pill text-h6" @click="limparCampos">Limpar
          Campos</v-btn>
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
    Nav, add
  },
  setup() {
    const enunciadoQuestao = ref();
    const questoes = ref([]);
    const enunciado = ref('');
    const correta = ref('');
    const route = useRoute();
    const router = useRouter();
    const showError = ref(false);
    const errorMessage = ref('');


    const saveFormDataToLocalStorage = () => {
      const formData = {
        enunciadoQuestao: enunciadoQuestao.value,
        enunciado: enunciado.value,
        correta: correta.value,
      };
      localStorage.setItem('alternativa_form_data', JSON.stringify(formData));
    };


    watch([enunciadoQuestao, enunciado, correta], () => {

      saveFormDataToLocalStorage();
    });


    const formDataFromLocalStorage = localStorage.getItem('alternativa_form_data');
    if (formDataFromLocalStorage) {
      const formData = JSON.parse(formDataFromLocalStorage);
      enunciadoQuestao.value = formData.enunciadoQuestao;
      enunciado.value = formData.enunciado;
      correta.value = formData.correta;
    }

    console.log('enunciadoQuestao:', enunciadoQuestao.value);
    console.log('enunciado:', enunciado.value);
    console.log('correta:', correta.value);

    const carregarQuestoes = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`https://api-quest-bank.vercel.app/questoes/listar`);
        questoes.value = response.data.questoes;
      } catch (error) {
        console.error('Erro ao carregar questões:', error);
      }
    };

    onMounted(() => {
      carregarQuestoes();
    });


    const limparCampos = () => {
      enunciadoQuestao.value = null;
      enunciado.value = '';
      correta.value = false;
    };

    const adicionarAlternativa = async () => {
      if (enunciadoQuestao.value && enunciado.value && correta.value !== null) {
        const enunciadoQuestaoValue = enunciadoQuestao.value.enunciado;
        const corretaValue = correta.value === '1' ? '1' : '0';

        const formData = {
          enunciado: enunciado.value,
          correta: corretaValue,
          enunciadoQuestao: enunciadoQuestaoValue,
        };

        console.log('formData:', formData);

        try {
          const response = await axios.post('https://api-quest-bank.vercel.app/alternativa/adicionar', formData);
          console.log('Alternativa criada:', response.data);

          localStorage.removeItem('alternativa_form_data');
          if (route.path !== '/telaConfim') {
      router.push('/telaConfim');
    } else {
      router.push('/telaErro');
    }
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
      enunciado,
      questoes,
      correta,
      adicionarAlternativa,

      enunciadoQuestao,
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
