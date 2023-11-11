<template>
  <div>
    <br /><br /><br />
    <Nav />
    <v-container class="mt-12">
      <v-card class="mx-auto" max-width="800" v-if="questao">
        <v-card-title class="text-blue font-weight-bold">Detalhes da Questão</v-card-title>
  <v-col cols="auto" class="mb-2 d-flex justify-center">
            <v-progress-circular v-if="isLoading" indeterminate color="blue"></v-progress-circular>
          </v-col>
        <v-card-text v-if="!isLoading && questao">
        
       
          <p><span class="text-blue font-weight-bold">Enunciado:</span> {{ questao.enunciado }}</p>
          <p><span class="text-blue font-weight-bold">Tipo:</span> {{ questao.tipo }}</p>
          <p><span class="text-blue font-weight-bold">Nível:</span> {{ questao.nivel }}</p>
          <p><span class="text-blue font-weight-bold">Resposta:</span> {{ questao.resposta }}</p>
          <p><span class="text-blue font-weight-bold">Professor:</span> {{ questao.professor.nome }}</p>
          <p><span class="text-blue font-weight-bold">Tópico:</span> {{ questao.topico.enunciado }}</p>
        
          <img v-if="questao.enunciado_imagem" :src="questao.enunciado_imagem" class="mt-7" alt="Imagem do Enunciado"
            width="300" />
          <br>
          <div>
            <v-row>
              <v-col cols="7">
<br>
                <v-card-title class="text-blue font-weight-bold mt-1">Alternativas</v-card-title>


              </v-col>
              <v-col cols="1"><br>
                <alternativa class="mt-4" />
              </v-col>
            </v-row>
          </div>
          <v-card-text>
            <ul>
              <p class="mt-5" v-for="(alternativa, index) in questao.alternativas" :key="alternativa.id_alternativa">
                <v-btn class="bg-blue white-text" elevation="2" rounded="xl" max-width="10" width="100%" height="20"
                  @click="verDetalhes(alternativa)">Ver</v-btn> <span font-weight-bold>{{ String.fromCharCode(97 + index) }})</span> {{
                    alternativa.enunciado }}

                <span v-if="alternativa.correta === 1"> (Correta)</span>
              </p>
            </ul>
          </v-card-text>
        </v-card-text>
        <br /><br />
        <v-row justify="center">
          <v-col cols="auto" class="mb-2">
            <v-btn v-if="idAtual == idCriador" class="bg-blue white-text" elevation="2" rounded="xl" max-width="200" width="100%" height="40">
              <router-link v-if="questao" :to="`/editar-questao/${questao.id_questao}`"
                style="color: #fff; text-decoration: none;">Editar</router-link>
            </v-btn>
          </v-col>
          <v-col cols="auto" class="mb-2">
            <v-btn v-if="idAtual == idCriador" class="bg-red" elevation="2" rounded="xl" max-width="200" width="100%" height="40"
              @click="confirmarExclusao(questao ? questao.id_questao : null)">Excluir</v-btn>
            <br><br>
          </v-col>
        </v-row>
      </v-card>
    </v-container>
    <v-dialog v-model="dialogExclusao" max-width="500">
      <v-card>
        <v-card-title class="mt-3 ml-2 text-h5 text-blue">Confirmar exclusão</v-card-title>
        <v-card-text>
          Tem certeza que deseja excluir essa questão?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogExclusao = false">Não</v-btn>
          <v-btn color="blue darken-1" text @click="deleteQuestao(questao.id_questao)">Sim</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Nav from '@/components/Nav.vue';
import axios from 'axios';
import alternativa from '@/components/telaHome/Alternativas/addAlternativa.vue';
export default {
  components: {
    Nav, alternativa
  },
  data() {
    return {
      id_questao: null,
      questao: null,
      dialogExclusao: false,
      isLoading: true,
      idCriador: null,
      userId: localStorage.getItem('userId'),
    };
  },
  async mounted() {
    this.id_questao = this.$route.params.id;
    await this.fetchQuestao();
  },
  methods: {
    async fetchQuestao() {
  try {
    const response = await axios.get(`https://api-quest-bank.vercel.app/questao/listar/${this.id_questao}`);
    if (response.data.status === "success") {
      this.questao = response.data.questao;
      console.log(this.questao);  // Add this line
      this.isLoading = false;
      this.idAtual = this.userId;
      if (this.questao.professor) {
        this.idCriador = this.questao.professor.id_professor;
      }
      console.log(this.idAtual);
      console.log(this.idCriador);
    } else {
      console.error("Erro", response.data.msg);
    }
  } catch (error) {
    console.error("Erro", error);
  }
},
     confirmarExclusao(idQuestao) {
      this.questao.id_questao = idQuestao;
      this.dialogExclusao = true;
    },
    async deleteQuestao() {
      try {
        const response = await axios.delete(`https://api-quest-bank.vercel.app/questao/deletar/${this.id_questao}`);
        if (response.data.status === "success") {
          this.$router.push('/telaConfimExcluir');
        } else {
          console.error("Erro ao excluir a questão", response.data.msg);
          this.$router.push('/telaErro');
        }
      } catch (error) {
        console.error("Erro ao excluir a questão", error);
      }
    },
    verDetalhes(alternativa) {
      this.$router.push({ name: 'AlternativaDetalhes', params: { id: alternativa.id_alternativa } });
    },
  },
};
</script>
