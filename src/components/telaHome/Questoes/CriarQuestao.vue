<template><v-container><v-container>
  <Nav/>
    <v-card elevation="0">
      <br>
      <v-card-title class="text-blue font-weight-bold text-center text-h5">Adicionar Questão</v-card-title>
     <br><br>
      <v-card-text>
        <v-form ref="form">
          <label>Enunciado</label>
          
          <v-textarea
          class="mt-3"
          placeholder="Exemplo:   Numa classe, há 15 meninos e 13 meninas. Quantas crianças há ao todo? "
          variant="solo"
          rows="2"
          row-height="20">
          </v-textarea>
          <label>Tópico</label>
          <v-textarea
          class="mt-3"
          placeholder="Exemplo:   Operações matemáticas básicas"
          rows="2"
          variant="solo"
          row-height="20">
          </v-textarea>
           <label>Dificuldade</label>
          <v-select
          placeholder="Exemplo:   Fácil"
          :items="['']"
           variant="solo"
           class="mt-3"
           ></v-select>

          <label>Tipo</label>
          <v-select
          placeholder="Exemplo:   Objetiva"
          :items="['']"
           variant="solo"
           class="mt-3"
           ></v-select>
           <label>Imagem</label>
           <v-file-input class="mt-3" label="Escolha a imagem " variant="solo"></v-file-input>
  
          <v-icon
            class="custom"
            color="blue"
            :class="{ 'animated-btn': animateButton }"
            @click="addNovaAlternativa"
            @mouseover="animateButton = true"
            @mouseleave="resetAnimation"
          >
            mdi-plus-circle
          </v-icon>
  
          <div v-for="(alternativa, index) in alternativas" :key="index">
          <label>Enunciado da questão existente</label>
          <v-textarea  
          class="mt-3"
          placeholder="Exemplo:   Numa classe, há 15 meninos e 13 meninas. Quantas crianças há ao todo?"
          rows="2"
          variant="solo"
          row-height="20" 
          v-model="alternativa.enunciadoQuestao" 
          ></v-textarea>
          <label>Alternativa</label>
          <v-textarea 
          class="mt-3"
          placeholder="Exemplo:   28"
          rows="2"
          variant="solo"
          row-height="20" 
          v-model="alternativa.enunciado">
        </v-textarea>
            <v-checkbox v-model="alternativa.correta" label="Correta"></v-checkbox>
          </div>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-center align-itens-center">

        <v-btn  :height="50" :width="240" class="bg-blue rounded-pill text-h6" @click="saveAlternativas">Salvar</v-btn>
      </v-card-actions>
    </v-card></v-container></v-container>
  </template>

<script> 
import Nav from '@/components/Nav.vue';
import axios from 'axios';

export default { components:{
Nav,
},  
  data() {
    return {
      animateButton: false,
      alternativas: [],
      enunciadoQuestao: '',
      enunciado: '',
    };
  },
  methods: {
    resetAnimation() {
      this.animateButton = false;
    },
    addNovaAlternativa() {
      this.alternativas.push({
        enunciadoQuestao: this.enunciadoQuestao,
        enunciado: this.enunciado,
        correta: false,
      });
    },
    convertBooleanToInt(value) {
      return value ? 1 : 0;
    },
    async saveAlternativas() {
      try {
        for (const alternativa of this.alternativas) {
          const response = await axios.post('http://localhost:3000/criarAlternativas', {
            enunciado: alternativa.enunciado,
            enunciadoQuestao: alternativa.enunciadoQuestao,
            correta: this.convertBooleanToInt(alternativa.correta),
          });

          if (response.data.status === 'success') {
            console.log('Alternativa criada com sucesso:', response.data.msg);

          } else {
            console.error('Erro ao criar alternativa:', response.data.msg);
          }
        }
      } catch (error) {
        console.error('Erro ao fazer a requisição:', error);
      }
    },
  },
};
</script>
  
  <style>
  .custom {
    transition: all 0.3s;
  }
  .animated-btn {
    transform: scale(1.5);
  }
  </style>
  