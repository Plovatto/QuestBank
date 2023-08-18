<template>
    <v-card>
      <v-card-title class="text-blue font-weight-bold text-center text-h5">Nova alternativa</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <div v-for="(alternativa, index) in alternativas" :key="index" class="d-flex align-center">
            <v-checkbox
              v-model="alternativa.correta"
              label="Correta"
              @change="alternativaCorretaChanged(index)"
            ></v-checkbox>
            <v-text-field v-model="alternativa.enunciado" label="Enunciado da alternativa"></v-text-field>
          </div>
          <v-icon
            class="custom"
            color="blue"
            :class="{ 'animated-btn': animateButton }"
            @click="adicionarNovaAlternativa"
            @mouseover="animateButton = true"
            @mouseleave="resetAnimation"
          >
            mdi-plus-circle
          </v-icon>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-center align-itens-center">
       
        <v-btn :height="50" :width="240" class="bg-blue rounded-pill text-h6" @click="salvar">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </template>
  
  <script>
  export default {
    data() {
      return {
        animateButton: false,
        alternativas: [{ enunciado: '', correta: false }],
      };
    },
    methods: {
      resetAnimation() {
        this.animateButton = false;
      },
      adicionarNovaAlternativa() {
        this.alternativas.push({ enunciado: '', correta: false });
      },
      alternativaCorretaChanged(index) {
        for (let i = 0; i < this.alternativas.length; i++) {
          if (i !== index) {
            this.alternativas[i].correta = false;
          }
        }
      },
      cancelar() {
      
        this.$router.push('/tela-anterior');
      },
      salvar() {

        const alternativasCorretas = this.alternativas.filter(alternativa => alternativa.correta);
        if (alternativasCorretas.length !== 1) {
          alert('Selecione uma alternativa correta.');
          return;
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
  