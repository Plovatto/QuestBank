<template>
  <v-container class="mt-15">
    <Nav />
    <v-card elevation="0">
      <v-card-title class="text-blue font-weight-bold text-center text-h5">Editar Questão</v-card-title><br>
      <v-card-text>
        <v-form ref="form" @submit="editarQuestao">
          <v-textarea variant="solo"  label="Enunciado da questão" v-model="enunciado" outlined rows="6" row-height="25"></v-textarea>

          <v-select variant="solo" v-if="topicos.length > 0" v-model="enunciadoTopico" :items="topicos" item-text="enunciado" item-value="enunciado" label="Selecione um tópico" outlined></v-select>
          <v-select variant="solo"  label="Tipo" v-model="tipo" :items="['Objetiva', 'Dissertativa']" outlined></v-select>
          <div v-if="tipo === 'Dissertativa'">
            <v-textarea variant="solo"  label="Resposta da questão" v-model="resposta" outlined rows="4"></v-textarea>
          </div>
          <v-select variant="solo"  label="Nível" v-model="nivel" :items="['Fácil', 'Médio', 'Difícil']" outlined></v-select>
         
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-center align-items-center">
        <v-btn @click="editarQuestao" height="50" width="240" class="bg-blue rounded-pill text-h6">Salvar edição</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog" max-width="500">
      <v-card>
        <br>
        <v-card-title style="font-size: 20px;" class="font-weight-bold text-blue ml-2 mr-4">Editada com sucesso!
          <v-icon class="ml-2" color="info" icon="mdi-check-circle" size="small"></v-icon>
        </v-card-title>
        <v-card-text class="text-blue">A questão foi editada com sucesso.</v-card-text>
        <br><br>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Nav from '@/components/Nav.vue';
import axios from 'axios';

export default {
  components: {
    Nav,
  },
  data() {
    return {
      questaoId: null,
      enunciado: '',
      enunciadoImagem: null,
      tipo: '',
      nivel: '',
      resposta: '',
      enunciadoTopico: '',
      imagePreview: null,
      dialog: false,topicos: [],
    };
  },
  async mounted() {
    this.questaoId = this.$route.params.id;
    await this.carregarDetalhesQuestao();
    await this.carregarTopicos();
  
},
  methods: {
    async carregarDetalhesQuestao() {
  try {
    const response = await axios.get(`https://api-quest-bank.vercel.app/questao/listar/${this.questaoId}`);
    if (response.data.status === 'success') {
      const questao = response.data.questao;
      this.enunciado = questao.enunciado;
      this.enunciadoTopico = questao.topico.enunciado; 
      this.tipo = questao.tipo;
      this.nivel = questao.nivel;
      this.resposta = questao.resposta || '';
      this.imagePreview = questao.enunciado_imagem;
    } else {
      console.error('Erro ao carregar detalhes da questão:', response.data.msg);
    }
  } catch (error) {
    console.error('Erro ao carregar detalhes da questão:', error);
  }
},

    onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },redirectToDetails() {
  console.log('Redirecionando para a tela anterior');
  this.$router.go(-1);
},
    async editarQuestao() {
      try {
        const dadosEditados = {
          enunciadoTopico: this.enunciadoTopico,
          enunciado: this.enunciado,
          enunciado_imagem: this.imagePreview,
          tipo: this.tipo,
          nivel: this.nivel,
          resposta: this.resposta,
        };

        const response = await axios.put(`https://api-quest-bank.vercel.app/questao/atualizar/${this.questaoId}`, dadosEditados);
        if (response.data.status === 'success') {
          console.log('Questão editada com sucesso');
          this.dialog = true;
          setTimeout(() => {
            this.redirectToDetails();
          }, 2000);
        } else {
          console.error('Erro ao editar a questão:', response.data.msg);
          this.$router.push('/telaErro');
        }
      } catch (error) {
        console.error('Erro ao editar a questão:', error);
      }
    }, async carregarTopicos() {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`https://api-quest-bank.vercel.app/topico/listar/?idProfessor=${userId}`);
        if (response.data.status === 'success') {
          this.topicos = response.data.topicos.map(topico => topico.enunciado); 
        } else {
          console.error('Erro ao carregar tópicos:', response.data.msg);
        }
      } catch (error) {
        console.error('Erro ao carregar tópicos:', error);
      }
    },
    redirectToDetails() {
      this.$router.push(`/questao-detalhes/${this.questaoId}`);
    },
  },
};
</script>
