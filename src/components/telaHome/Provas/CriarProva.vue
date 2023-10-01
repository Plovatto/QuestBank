<template>
  <br /><br />
  <v-container class="mt-8">
    <v-container>
      <Nav />
      <v-card elevation="0">
        <v-card-title class="text-blue font-weight-bold text-center text-h5">Adicionar Avaliação</v-card-title>
        <br /><br />
        <v-card-text>
          <label>Nome da avaliação</label>
          <v-form ref="form" @submit="adicionarProva">
            <v-textarea placeholder="Exemplo: Prova 2" class="mt-3" rows="2" row-height="20" variant="solo"
              v-model="enunciado"></v-textarea>

            <label>Tipo</label>
            <v-select class="mt-3" v-model="tipo" :items="['Objetiva', 'Dissertativa', 'Ambas']"
              variant="solo"></v-select>

            <label>Descrição</label>
            <v-textarea placeholder="Exemplo: Prova do 3° ano segundo trimestre" class="mt-3" rows="2" row-height="20"
              variant="solo" v-model="descricao"></v-textarea>

            <label>Questões</label>
            <v-textarea placeholder="Exemplo: [1,2,3]" class="mt-3" rows="2" row-height="20" variant="solo"
              v-model="questoes"></v-textarea>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center align-items-center">
          <v-btn @click="prova" :height="50" :width="240" class="bg-blue rounded-pill text-h6">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
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
    const route = useRoute();
    const router = useRouter();
    const enunciado = ref("");
    const tipo = ref("");
    const descricao = ref("");
    const questoes = ref("");
    const professorId = localStorage.getItem('userId');

    async function adicionarProva() {
      try {
        const questoesArray = questoes.value.split(',');
        const values = questoesArray.map((questaoId) => [questaoId]);
        const response = await axios.post("https://questbankapi.onrender.com/prova/adicionar", {
          questoes: values,
          enunciado: enunciado.value,
          descricao: descricao.value,
          tipo: tipo.value,
          professorId: professorId,
        });

        console.log("Prova criada:", response.data);
      } catch (error) {
        console.error("Erro ao criar prova:", error);
        console.log(questoes.value);
      }
    }

    const prova = () => {
      if (route.path !== '/telaConfim') {
        adicionarProva();
        router.push('/telaConfim');
      }else{
        this.$router.push('/telaErro');
      }
    }

    return {
      enunciado,
      descricao,
      tipo,
      professorId,
      questoes,
      prova,
      adicionarProva,
    };
  },
});
</script>