<template>
  <br />
  <v-container class="mt-8">
    <v-container>
      <Nav />
      <v-card elevation="0">
        <v-card-title class="text-blue font-weight-bold text-center text-h5">Adicionar Questão</v-card-title>
        <br />
        <v-card-text>

          <label>Enunciado</label>
          <v-form ref="form" @submit="adicionarQuestao">
            <v-textarea
              placeholder="Exemplo: Em uma sala existem 2 meninos e 4 meninas, quantas crianças existem no total?"
              class="mt-3" rows="2" row-height="20" variant="solo" v-model="enunciado"></v-textarea>

            <label>Tópico </label>
            <add />
            <select class="mt-3 custom-select" v-model="topico_enunciado">
              <option value="">Selecione um tópico</option>
              <option v-for="topico in topicos" :value="topico.enunciado">{{ topico.enunciado }}</option>
            </select>
            <br> <br>
            <label>Tipo</label>
            <v-select class="mt-3" v-model="tipo" :items="['Objetiva', 'Dissertativa']" label="Selecione o tipo"
              variant="solo"></v-select>
            <div v-if="tipo === 'Dissertativa'">
              <label>Resposta</label>
              <v-textarea variant="solo" class="mt-3" v-model="resposta" @input="limparErro('erroResposta')"></v-textarea>
            </div>
            <label>Nível</label>
            <v-select class="mt-3" label="Selecione o nível" v-model="nivel" :items="['Fácil', 'Médio', 'Difícil']"
              variant="solo"></v-select>

            <label>Imagem</label>
            <v-file-input class="mt-3" type="file" label="Selecione a imagem" variant="solo"
              v-on:change="handleFileChange($event)"></v-file-input>


            <v-alert v-if="showError" type="error" class="mt-3">{{ errorMessage }}</v-alert>

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
import { defineComponent, ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import add from "@/components/telaHome/Topicos/addTopico.vue";
export default defineComponent({
  components: {
    Nav, add
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
    const imagemFileName = ref("");
    const topicos = ref([]);
    const showError = ref(false);
    const errorMessage = ref('');
    function handleFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        imagemFileName.value = file.name;
      } else {
        imagemFileName.value = "";
      }
    }

    const carregarTopicos = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`https://api-quest-bank.vercel.app/topico/listar/?idProfessor=${userId}`);
        if (response.data.status === "success") {
          topicos.value = response.data.topicos;
        } else {
          console.error("Erro ao carregar tópicos:", response.data.msg);
        }
      } catch (error) {
        console.error("Erro ao carregar tópicos:", error);
      }
    };

    onMounted(() => {
      carregarTopicos();
    });
    console.log("Tópico selecionado:", topico_enunciado.value);

    const adicionarQuestao = async () => {
      try {
        const response = await axios.post("https://api-quest-bank.vercel.app/questao/adicionar", {
          enunciado: enunciado.value,
          topico_enunciado: topico_enunciado.value,
          tipo: tipo.value,
          Enunciado_imagem: imagemFileName.value,
          nivel: nivel.value,
          resposta: resposta.value,
          professor_nome: professor_nome,
        });
        console.log("Questão criada:", response.data);
      } catch (error) {
        console.error("Erro ao criar questão:", error);
      }
    };

    const questao = () => {
      if (nivel.value && enunciado.value && tipo.value && topico_enunciado.value) {
        if (route.path !== '/telaConfim') {
          adicionarQuestao();
          router.push('/telaConfim');
        } else {
          router.push('/telaErro');
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
      topico_enunciado,
      tipo,
      Enunciado_imagem,
      nivel,
      resposta,
      professor_nome,
      imagemFileName,
      topicos,
      handleFileChange,
      questao,
      showError,
      errorMessage,
    };
  },
});
</script>