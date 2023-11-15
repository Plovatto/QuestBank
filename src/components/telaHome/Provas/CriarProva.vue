<template>
  <Nav />
  <br>
  <v-container class="mt-8">
    <v-card elevation="0">
      <v-card-title class="text-blue font-weight-bold text-center text-h6">Adicionar Prova</v-card-title>
      <v-card-text>
        <v-form ref="form" @submit="prova">

          <br><br>
          <label>Nome da prova</label><button type="button" class="rounded-pill small" @click.prevent="mostrarInfo('enunciado')">ℹ️</button>

      
<v-card v-if="mostrarCardInfoEnunciado" class="info-card">
  <v-card-title>Informações sobre o campo Nome da Prova</v-card-title>
  <v-card-text>
   Este campo é destinado para o nome da prova. Neste campo, ofereça um título referente a prova que será criada. 
   <p class="font-weight-bold">OBS: O arquivo PDF terá o mesmo nome da prova.</p>
  </v-card-text>
  <v-card-actions>
    <v-btn @click="ocultarInfo('enunciado')">Fechar</v-btn>
  </v-card-actions>
</v-card>
          <v-textarea placeholder="Exemplo: Prova 1" class="mt-3" rows="2" row-height="20" variant="solo"
            v-model="enunciado"></v-textarea>
          <label>Tipo</label>
          <button class="rounded-pill small" type="button"  @click.prevent="mostrarInfo('tipo')">ℹ️</button>
          <v-card v-if="mostrarCardInfoTipo" class="info-card">
            <v-card-title>Informações sobre o campo Tipo</v-card-title>
            <v-card-text>
              Este campo é destinado para selecionar o tipo da prova. Escolha se a prova irá conter questões objetivas, dissertativas ou ambas.
            </v-card-text>
            <v-card-actions>
              <v-btn @click="ocultarInfo('tipo')">Fechar</v-btn>
            </v-card-actions>
          </v-card>
          <v-select class="mt-3" label="Selecione o tipo" v-model="tipo" :items="['Objetiva', 'Dissertativa', 'Ambas']"
            variant="solo"></v-select>
          <label>Descrição</label><button class="rounded-pill small" type="button"  @click.prevent="mostrarInfo('resposta')">ℹ️</button>
          <v-card v-if="mostrarCardInfoResposta" class="info-card">
            <v-card-title>Informações sobre o campo Descrição</v-card-title>
            <v-card-text>
              Este campo é destinado para a descrição da prova. Forneça orientações sobre a prova, como por exemplo de como realizar as questões.
            </v-card-text>
            <v-card-actions>
              <v-btn @click="ocultarInfo('resposta')">Fechar</v-btn>
            </v-card-actions>
          </v-card>
          <v-textarea placeholder="Exemplo: Leia cuidadosamente cada pergunta antes de responder. Isso ajuda a compreender completamente o que é solicitado." class="mt-3" rows="4" row-height="30"
            variant="solo" v-model="descricao"></v-textarea>
        
            <div class="d-flex">
  <v-row class="mt-0 pt-0">
  <v-col cols="6" v-if="!mostrarCardInfoNivel">
      <label class="mt-0">Filtro tópico </label> <v-icon class="ml-2" color="red" @click="topico= ''" v-if="topico" size="small" >mdi-close-circle</v-icon>
      <button class="rounded-pill small" type="button" @click.prevent="mostrarInfo('topico2')">ℹ️</button><br>
      <v-card v-if="mostrarCardInfoTopico2" class="info-card2">
        <v-card-title>Informações sobre o campo filtro de Tópico</v-card-title>
        <v-card-text>
          Este campo é destinado para filtrar o tópico da questão. Caso queira achar uma questão de um determinado tópico, basta escolher neste campo o tópico e após ao selecionar as questões exibirá somente as questões do tópico escolhido.
    
        </v-card-text>
        <v-card-actions>
          <v-btn @click="ocultarInfo('topico2')">Fechar</v-btn>
        </v-card-actions>
      </v-card>
      
      <select density="compact" class="custom-select mt-3" v-model="topico">
      <option value="">Filtrar por tópico</option>
      <option v-for="topico in topicos" :value="topico.id_topico">{{ topico.enunciado }}</option>
    </select>
    </v-col>
    <v-col cols="6" v-if="!mostrarCardInfoTopico2">
      <label>Filtro nível</label>  <v-icon style=" height: 12px;" class="ml-2" color="red" @click="nivel= ''" v-if="nivel" size="small" >mdi-close-circle</v-icon>
      <button class="rounded-pill small ml-3" type="button" @click.prevent="mostrarInfo('nivel')">ℹ️</button>
      <v-card v-if="mostrarCardInfoNivel" class="info-card2">
        <v-card-title>Informações sobre o campo filtro de Nível</v-card-title>
        <v-card-text>
          Este campo é destinado para filtrar o nível de dificuldade da questão. Caso queira achar uma questão de um determinado nível, basta escolher neste campo o nível e após ao selecionar as questões exibirá somente as questões do nível de dificuldade escolhido.
        </v-card-text>
        <v-card-actions>
          <v-btn @click="ocultarInfo('nivel')">Fechar</v-btn>
        </v-card-actions>
      </v-card>
      <v-select class="mt-3 mb-0" v-model="nivel" :items="Object.keys(niveis)" variant="solo" @change="carregarQuestoes"></v-select>
    </v-col> 
 
  
 
  </v-row>
  <br><br>
</div>
  <label>Questões </label> <add class="ml-1 mr-1" /> <button class="rounded-pill small" type="button"  @click.prevent="mostrarInfo('topico')">ℹ️</button>
          <v-card v-if="mostrarCardInfoTopico" class="info-card">
            <v-card-title>Informações sobre o campo Questões</v-card-title>
            <v-card-text>
              Este campo é destinado para selecionar as questões que estarão na prova. Escolha as questões relevantes para criar a prova.
             <p class="font-weight-bold">OBS: Caso não exista uma questão relevante, crie uma nova questão.</p>
            </v-card-text> 
            <v-card-actions>
              <v-btn @click="ocultarInfo('topico')">Fechar</v-btn>
            </v-card-actions>
          </v-card>
            
          

            <div>


    <v-combobox  v-if="nivel || topico" class="mt-3" color="info" clearable chips multiple variant="solo" v-model="selectedQuestoes" :items="questoes" :item-text="itemText" item-value="id_questao" label="Selecione as questões"></v-combobox>
    <v-combobox  v-if="!(nivel || topico)" class="mt-3"  variant="solo" v-model="selectedQuestoes" :items="questoes" :item-text="itemText" item-value="id_questao" label="Selecione as questões" multiple></v-combobox>
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
import { defineComponent, ref, watch, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, useRoute } from 'vue-router';
import add from "@/components/telaHome/Questoes/addQuestao.vue";
export default defineComponent({
  components: {
    Nav, add
  },
  setup() {
    const nivel = ref('');
    const topico = ref('');
    const topicos = ref([]);
    const enunciado = ref('');
    const tipo = ref('');
    const descricao = ref('');
    const professorId = localStorage.getItem('userId');
    const route = useRoute();
    const router = useRouter();
    const showError = ref(false);
    const errorMessage = ref('');
    const questoes = ref([
 
    
    ]);const mostrarCardInfoEnunciado = ref(false);
    const mostrarCardInfoTopico = ref(false);
    const mostrarCardInfoTopico2 = ref(false);
    const mostrarCardInfoTipo = ref(false);
    const mostrarCardInfoResposta = ref(false);
    const mostrarCardInfoNivel = ref(false);
    const cartoesInfoAbertos = ref([]);

const mostrarInfo  = (campo) => {
  if (cartoesInfoAbertos.value.includes(campo)) {
   
      cartoesInfoAbertos.value.splice(cartoesInfoAbertos.value.indexOf(campo), 1);
    } else {
     
      cartoesInfoAbertos.value = [campo];
    }
 
  mostrarCardInfoEnunciado.value = cartoesInfoAbertos.value.includes('enunciado');
  mostrarCardInfoTopico.value = cartoesInfoAbertos.value.includes('topico');
  mostrarCardInfoTopico2.value = cartoesInfoAbertos.value.includes('topico2');
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
      if (campo === 'topico2') {
        mostrarCardInfoTopico2.value = false;
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
    const selectedQuestoes = ref([]);
   const niveis = {
  'Fácil': 'facil',
  'Médio': 'medio',
  'Difícil': 'dificil'
};const nivelSemAcento = niveis[nivel.value];
    const limparCampos = () => {
  enunciado.value = '';
  tipo.value = '';
  descricao.value = '';
  nivel.value = '';
  topico.value = '';
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
    };onMounted(carregarTopicos);
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
    };const carregarQuestoes = async () => {
  try {
    
    const response = await axios.get(`https://api-quest-bank.vercel.app/questoes/listar/`);
    questoes.value = response.data.questoes.map(questao => questao.enunciado);
  } catch (error) {
    console.error('Erro ao carregar questões:', error);
  }
};carregarQuestoes();
    const carregarQuestoes2 = async () => {
  try {
    let url = 'https://api-quest-bank.vercel.app/questoes/listar/';
    let urlNivel;
    let urlTopico;
    if (nivel.value) {
      urlNivel = `https://api-quest-bank.vercel.app/questao/listar/nivel/?nivel=${nivel.value}`;
    }
    if (topico.value) {
      urlTopico = `https://api-quest-bank.vercel.app/questao/listar/topico/?idTopico=${topico.value}`;
    }

    if (!nivel.value && !topico.value) {
      const response = await axios.get(url);
      questoes.value = response.data.questoes.map(questao => questao.enunciado);
    } else {
      const responseNivel = nivel.value ? await axios.get(urlNivel) : null;
      const responseTopico = topico.value ? await axios.get(urlTopico) : null;

      const questoesNivel = responseNivel ? responseNivel.data.questoes.map(questao => questao.enunciado) : [];
      const questoesTopico = responseTopico ? responseTopico.data.questoes.map(questao => questao.enunciado) : [];

      questoes.value = [...questoesNivel, ...questoesTopico];
    }
  } catch (error) {
    console.error('Erro ao carregar questões:', error);
  }
};

watch([nivel, topico], () => {
  carregarQuestoes2();
});



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
      selectedQuestoes, itemText,  nivel,
      topico,
      topicos,carregarTopicos, niveis,
      mostrarCardInfoEnunciado,
      mostrarCardInfoTopico,
      mostrarCardInfoTopico2,
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
.custom-select2 {
background-color: #0099ff;

} 
.info-card2 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 160%;
  z-index: 1;
}
</style>
