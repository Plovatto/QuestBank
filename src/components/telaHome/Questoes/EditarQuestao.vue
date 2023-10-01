<template>
    <v-container class="mt-15">
      <Nav />
      <v-card elevation="0">
        <v-card-title class="text-blue font-weight-bold text-center text-h5">Editar Questão</v-card-title>
        <v-card-text>
          <v-form ref="form" @submit="editarQuestao">
            <v-textarea label="Enunciado da questão" v-model="enunciado" outlined rows="4"></v-textarea>
            <v-select label="Tipo" v-model="tipo" :items="['Objetiva', 'Dissertativa']" outlined></v-select>
            <v-select label="Nível" v-model="nivel" :items="['Fácil', 'Médio', 'Difícil']" outlined></v-select>
            <v-textarea label="Resposta" v-model="resposta" outlined rows="4"></v-textarea>
            <v-file-input label="Enunciado da imagem" v-model="enunciadoImagem" @change="onFileChange" outlined rows="4"></v-file-input>
            <img v-if="imagePreview" :src="imagePreview" alt="Imagem de visualização" class="mt-2" width="200"/>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center align-items-center">
          <v-btn @click="editarQuestao" height="50" width="240" class="bg-blue rounded-pill text-h6">Salvar edição</v-btn>
        </v-card-actions>
      </v-card>
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
        imagePreview: null, 
      };
    },
    async mounted() {
      this.questaoId = this.$route.params.id;
      await this.carregarDetalhesQuestao();
    },
    methods: {
      async carregarDetalhesQuestao() {
        try {
          const response = await axios.get(`http://localhost:3000/questao/listar/${this.questaoId}`);
          if (response.data.status === 'success') {
            const questao = response.data.questao;
            this.enunciado = questao.enunciado;
            this.tipo = questao.tipo;
            this.nivel = questao.nivel;
            this.resposta = questao.resposta;
            this.imagePreview = questao.Enunciado_imagem; 
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
      },
      async editarQuestao() {
        try {
          const dadosEditados = {
            enunciado: this.enunciado,
            Enunciado_imagem: this.imagePreview, 
            tipo: this.tipo,
            nivel: this.nivel,
            resposta: this.resposta,
          };
  
          const response = await axios.put(`http://localhost:3000/questao/atualizar/${this.questaoId}`, dadosEditados);
          if (response.data.status === 'success') {
            console.log('Questão editada com sucesso');
            this.$router.push('/telaConfimEdit');
          } else {
            console.error('Erro ao editar a questão:', response.data.msg);
            this.$router.push('/telaErro');
          }
        } catch (error) {
          console.error('Erro ao editar a questão:', error);
        }
      },
    },
  };
  </script>
  