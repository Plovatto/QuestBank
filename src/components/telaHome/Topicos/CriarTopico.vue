<template>
  <Nav />
  <br><br>
  <v-container class="mt-8">
    <v-card elevation="0">
      <v-card-title class="text-blue font-weight-bold text-center text-h5">Adicionar Tópico</v-card-title>
      <v-card-text>
        <label>Disciplina</label>
        <v-form ref="form" @submit="criarTopico">

          <select class="mt-3 custom-select" id="disciplina" name="disciplina" v-model="selectedDisciplina">
            <option value="">Selecione uma disciplina</option>
            <option v-for="disciplina in disciplinas" :value="disciplina.nome">{{ disciplina.nome }}</option>
          </select>
          <br><br>
          <label>Enunciado</label>
          <v-textarea placeholder="Exemplo: Operações matemáticas básicas" class="mt-3" rows="2" row-height="20"
            variant="solo" v-model="enunciado"></v-textarea>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-center align-itens-center">
        <v-btn :height="50" :width="240" class="bg-blue rounded-pill text-h6" @click="topico">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import Nav from '@/components/Nav.vue';
export default defineComponent({
  components: {
    Nav,
  },
  setup() {
    const selectedDisciplina = ref('');
    const disciplinas = ref([]);
    const enunciado = ref('');
    const professorId = localStorage.getItem('userId');
    const route = useRoute();
    const router = useRouter();

    const criarTopico = async () => {
      const formData = {
        enunciado: enunciado.value,
        nome_disciplina: selectedDisciplina.value,
        professorId: professorId,
      };

      try {
        const response = await axios.post('https://api-quest-bank.vercel.app/topico/adicionar', formData);
        console.log('Tópico criado:', response.data);
      } catch (error) {
        console.error('Erro ao criar tópico:', error);
      }
    };

    const topico = () => {
      if (route.path !== '/telaConfim') {
        criarTopico();
        router.push('/telaConfim');
      } else {
        router.push('/telaErro');
      }
    };

    const carregarDisciplinas = async () => {
      try {
        const response = await axios.get('https://api-quest-bank.vercel.app/disciplina/listar');
        disciplinas.value = response.data.disciplinas;
      } catch (error) {
        console.error('Erro ao carregar disciplinas:', error);
      }
    };

    carregarDisciplinas();

    return {
      enunciado,
      selectedDisciplina,
      disciplinas,
      criarTopico,
      topico,
    };
  },
});
</script>
