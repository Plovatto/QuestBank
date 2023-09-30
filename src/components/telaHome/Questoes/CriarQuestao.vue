<template>
  <br /><br />
  <v-container class="mt-8">
    <v-container>
      <Nav />
      <v-card elevation="0">
        <v-card-title class="text-blue font-weight-bold text-center text-h5">Adicionar Questão</v-card-title>
        <br /><br />
        <v-card-text>

          <label>Enunciado</label>
          <v-form ref="form" @submit="adicionarQuestao">
            <v-textarea placeholder="Exemplo: Em uma sala existem 2 meninos e 4 meninas, quantas crianças existem no total?"  class="mt-3" rows="2"
              row-height="20" variant="solo" v-model="enunciado"></v-textarea>

            <label>Tópico do Enunciado</label>
            <v-text-field placeholder="Exemplo:  Operações matemáticas básicas" class="mt-3" variant="solo"
              v-model="topico_enunciado"></v-text-field>

            <label>Tipo</label>
            <v-select class="mt-3" v-model="tipo" :items="['Objetiva', 'Dissertativa']" variant="solo"></v-select>

            <template v-if="tipo === 'Objetiva'">
              <v-text-field class="mt-3" placeholder="Insira as alternativas" variant="solo"></v-text-field>
              <v-text-field class="mt-3" placeholder="Insira o enunciado associado a alternativa" variant="solo"></v-text-field>
              <v-checkbox class="mt-2"></v-checkbox>
            </template>

            <label>Imagem</label>
            <v-file-input class="mt-3" type="file" placeholder="Insira a imagem" variant="solo"
              v-model="Enunciado_imagem"></v-file-input>

            <label>Nível</label>
            <v-select class="mt-3" v-model="nivel" :items="['Fácil', 'Médio', 'Difícil']" variant="solo"></v-select>

            <label>Resposta</label>
            <v-text-field class="mt-3" placeholder="Exemplo: 6 crianças " variant="solo" v-model="resposta"></v-text-field>

          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center align-items-center">
          <v-btn :height="50" :width="240" class="bg-blue rounded-pill text-h6" @click="questao">Salvar</v-btn>
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
    const topico_enunciado = ref("");
    const tipo = ref("");
    const Enunciado_imagem = ref("");
    const nivel = ref("");
    const resposta = ref("");
    const professor_nome = localStorage.getItem("userName") || "";


    async function adicionarQuestao() {
      try {
        const response = await axios.post("https://questbankapi.onrender.com/criarQuestao", {
          enunciado: enunciado.value,
          topico_enunciado: topico_enunciado.value,
          tipo: tipo.value,
          Enunciado_imagem: Enunciado_imagem.value,
          nivel: nivel.value,
          resposta: resposta.value,
          professor_nome: professor_nome,

        });

        console.log("Questão criada:", response.data);
      } catch (error) {
        console.error("Erro ao criar questão:", error);
      }
    }

    const questao = () => {
      if (route.path !== '/telaConfim') {
        adicionarQuestao();
        router.push('/telaConfim');
      }
    }

    return {
      enunciado,
      topico_enunciado,
      tipo,
      Enunciado_imagem,
      nivel,
      resposta,
      professor_nome,
      questao,

    };
  },
});
</script>
