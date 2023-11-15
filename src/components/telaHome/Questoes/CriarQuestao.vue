<template>
  <br />
  <v-container class="mt-8">
    <v-container>
      <Nav />
      <v-card elevation="0">
        <v-card-title class="text-blue font-weight-bold text-center text-h6">Adicionar Questão</v-card-title>
        <br /><br>
        <v-card-text>

          <label>Conteúdo</label><button type="button" class="rounded-pill small"
            @click.prevent="mostrarInfo('enunciado')">ℹ️</button>


          <v-card v-if="mostrarCardInfoEnunciado" class="info-card">
            <v-card-title>Informações sobre o campo Enunciado</v-card-title>
            <v-card-text>
              Este campo é destinado para a pergunta da questão. Neste campo, ofereça uma breve introdução contextual,
              dados cruciais e instruções específicas. Esses elementos orientam os alunos, tornando a questão mais
              compreensível.
            </v-card-text>
            <v-card-actions>
              <v-btn @click="ocultarInfo('enunciado')">Fechar</v-btn>
            </v-card-actions>
          </v-card>
          <v-form ref="form" @submit="adicionarQuestao">
            <v-textarea
              placeholder="Exemplo: Em uma sala existem 2 meninos e 4 meninas, quantas crianças existem no total?"
              class="mt-3" rows="3" row-height="25" variant="solo" v-model="enunciado"></v-textarea>

            <label>Tópico </label>
            <button class="rounded-pill small" type="button" @click.prevent="mostrarInfo('topico')">ℹ️</button>
            <v-card v-if="mostrarCardInfoTopico" class="info-card">
              <v-card-title>Informações sobre o campo Tópico</v-card-title>
              <v-card-text>
                Este campo é destinado para selecionar o conteúdo da questão. Escolha o conteúdo relevante que corresponda ao assunto da questão.
                <p class="font-weight-bold">OBS: Caso não exista um tópico relevante, crie um novo tópico.</p>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="ocultarInfo('topico')">Fechar</v-btn>
              </v-card-actions>
            </v-card>
            <add class="ml-2" />
            <v-select variant="solo" class="mt-2" v-if="topicos.length > 0" v-model="topico_enunciado" :items="topicos"
              item-text="enunciado" item-value="enunciado" label="Selecione um tópico">
            </v-select>

            <label>Tipo</label>
            <button class="rounded-pill small" type="button" @click.prevent="mostrarInfo('tipo')">ℹ️</button>
            <v-card v-if="mostrarCardInfoTipo" class="info-card">
              <v-card-title>Informações sobre o campo Tipo</v-card-title>
              <v-card-text>
                Este campo é destinado para selecionar o tipo da questão. Escolha se a questão será objetiva ou
                dissertativa.
                <p class="font-weight-bold">OBS: Caso seja dissertativa será necessário preencher a resposta.</p>
              </v-card-text>
              <v-card-actions>
                <v-btn @click="ocultarInfo('tipo')">Fechar</v-btn>
              </v-card-actions>
            </v-card>
            <v-select class="mt-3" v-model="tipo" :items="['Objetiva', 'Dissertativa']" label="Selecione o tipo"
              variant="solo"></v-select>
            <div v-if="tipo === 'Dissertativa'">
              <label>Resposta</label>
              <button class="rounded-pill small" type="button" @click.prevent="mostrarInfo('resposta')">ℹ️</button>
              <v-card v-if="mostrarCardInfoResposta" class="info-card">
                <v-card-title>Informações sobre o campo Resposta</v-card-title>
                <v-card-text>
                  Este campo é destinado para a resposta da questão. Forneça a resposta correta esperada para a questão
                  aqui.
                </v-card-text>
                <v-card-actions>
                  <v-btn @click="ocultarInfo('resposta')">Fechar</v-btn>
                </v-card-actions>
              </v-card>
              <v-textarea variant="solo" class="mt-3" v-model="resposta" @input="limparErro('erroResposta')"></v-textarea>
            </div>
            <label>Nível</label>
            <button class="rounded-pill small" type="button" @click.prevent="mostrarInfo('nivel')">ℹ️</button>

            <v-card v-if="mostrarCardInfoNivel">
              <v-card-title>Informações sobre o campo Nível</v-card-title>
              <v-card-text>
                Este campo é destinado para selecionar o nível de dificuldade da questão. Escolha o nível de dificuldade
                em que você deseja classificar a questão.
              </v-card-text>
              <v-card-actions>
                <v-btn @click="ocultarInfo('nivel')">Fechar</v-btn>
              </v-card-actions>
            </v-card>
            <v-select class="mt-3" label="Selecione o nível" v-model="nivel" :items="['Fácil', 'Médio', 'Difícil']"
              variant="solo"></v-select>




            <v-alert v-if="showError" type="error" class="mt-3">{{ errorMessage }}</v-alert>

          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center flex-column align-items-center">
          <v-btn :height="50" :width="240" class="bg-blue rounded-pill text-h6" @click="questao">Salvar</v-btn>
          <br><v-btn :height="50" :width="240" class="bg-red rounded-pill text-h6" @click="limparCampos">Limpar
            Campos</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </v-container>
</template>

<script>
import Nav from "@/components/Nav.vue";
import { defineComponent, ref, onMounted, watch } from 'vue';
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
    const topicos = ref([]);
    const showError = ref(false);
    const errorMessage = ref('');
    const mostrarCardInfoEnunciado = ref(false);
    const mostrarCardInfoTopico = ref(false);
    const mostrarCardInfoTipo = ref(false);
    const mostrarCardInfoResposta = ref(false);
    const mostrarCardInfoNivel = ref(false);
    const cartoesInfoAbertos = ref([]);

    const mostrarInfo = (campo) => {
      if (cartoesInfoAbertos.value.includes(campo)) {

        cartoesInfoAbertos.value.splice(cartoesInfoAbertos.value.indexOf(campo), 1);
      } else {

        cartoesInfoAbertos.value = [campo];
      }

      mostrarCardInfoEnunciado.value = cartoesInfoAbertos.value.includes('enunciado');
      mostrarCardInfoTopico.value = cartoesInfoAbertos.value.includes('topico');
      mostrarCardInfoTipo.value = cartoesInfoAbertos.value.includes('tipo');
      mostrarCardInfoResposta.value = cartoesInfoAbertos.value.includes('resposta');
      mostrarCardInfoNivel.value = cartoesInfoAbertos.value.includes('nivel');
    };


    const ocultarInfo = (campo) => {
      if (campo === 'enunciado') {
        mostrarCardInfoEnunciado.value = false;
      }
      if (campo === 'topico') {
        mostrarCardInfoTopico.value = false;
      }
      if (campo === 'tipo') {
        mostrarCardInfoTipo.value = false;
      }
      if (campo === 'resposta') {
        mostrarCardInfoResposta.value = false;
      }
      if (campo === 'nivel') {
        mostrarCardInfoNivel.value = false;
      }

    };

    const saveFormDataToLocalStorage = () => {
      const formData = {
        enunciado: enunciado.value,
        topico_enunciado: topico_enunciado.value,
        tipo: tipo.value,

        nivel: nivel.value,
        resposta: resposta.value,
        professor_nome: professor_nome,
      };
      localStorage.setItem('questao_form_data', JSON.stringify(formData));
    };


    watch([enunciado, topico_enunciado, tipo, nivel, resposta], () => {

      saveFormDataToLocalStorage();
    });

    const formDataFromLocalStorage = localStorage.getItem('questao_form_data');
    if (formDataFromLocalStorage) {
      const formData = JSON.parse(formDataFromLocalStorage);
      enunciado.value = formData.enunciado;
      topico_enunciado.value = formData.topico_enunciado;
      tipo.value = formData.tipo;

      nivel.value = formData.nivel;
      resposta.value = formData.resposta;
    }

    const carregarTopicos = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`https://api-quest-bank.vercel.app/topico/listar/?idProfessor=${userId}`);
        if (response.data.status === 'success') {
          topicos.value = response.data.topicos.map(topico => topico.enunciado);
        } else {
          console.error('Erro ao carregar tópicos:', response.data.msg);
        }
      } catch (error) {
        console.error('Erro ao carregar tópicos:', error);
      }
    };
    onMounted(async () => {
      await carregarTopicos();
      const formDataFromLocalStorage = localStorage.getItem('questao_form_data');
      if (formDataFromLocalStorage) {
        const formData = JSON.parse(formDataFromLocalStorage);
        topico_enunciado.value = formData.topico_enunciado;
      }
    });

    const adicionarQuestao = async () => {
      try {
        const response = await axios.post("https://api-quest-bank.vercel.app/questao/adicionar", {
          enunciado: enunciado.value,
          topico_enunciado: topico_enunciado.value,
          tipo: tipo.value,

          nivel: nivel.value,
          resposta: resposta.value,
          professor_nome: professor_nome,
        });
        console.log("Questão criada:", response.data);


        localStorage.removeItem('questao_form_data');

        limparCampos();

        if (route.path !== '/telaConfim') {
          router.push('/telaConfim');
        } else {
          router.push('/telaErro');
        }
      } catch (error) {
        console.error("Erro ao criar questão:", error);
      }
    };

    const questao = () => {
      if (nivel.value && enunciado.value && tipo.value && topico_enunciado.value) {
        adicionarQuestao();
      } else {
        errorMessage.value = 'Por favor, preencha todos os campos obrigatórios.';
        showError.value = true;
        setTimeout(() => {
          showError.value = false;
          errorMessage.value = '';
        }, 3000);
      }
    };

    const limparCampos = () => {
      enunciado.value = "";
      topico_enunciado.value = "";
      tipo.value = "";
      nivel.value = "";
      resposta.value = "";
      localStorage.removeItem('questao_form_data');
    };

    return {
      enunciado,
      topico_enunciado,
      tipo,
      nivel,
      resposta,
      professor_nome,
      topicos,
      questao,
      showError,
      errorMessage,
      limparCampos,
      mostrarCardInfoEnunciado,
      mostrarCardInfoTopico,
      mostrarCardInfoTipo,
      mostrarCardInfoResposta,
      mostrarCardInfoNivel,
      mostrarInfo,
      ocultarInfo,
    };
  },
});
</script>
<style>
.info-card {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
  z-index: 1;
}

.small {
  font-size: 12px;
  width: 20px;
  height: 20px;
  background-color: #e3f3ff;
  margin-left: 5px;
}</style>