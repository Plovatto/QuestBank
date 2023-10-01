<template>
    <div v-if="mostrarMensagem" class="d-flex align-center justify-center vh-100">
      <v-container class="text-center">
        <v-icon color="red" size="80">mdi-close-circle</v-icon>
        <h1 class="text-red font-weight-bold text-h3 mt-10">Erro!</h1>
        <h3 class="font-weight-medium mt-5">Houve um erro!</h3>
        <v-btn :height="50" :width="240" class="bg-red rounded-pill text-overline font-weight-bold mt-8 mb-15" @click="voltar">Ok</v-btn>
      </v-container>
    </div>
  </template>
  
  <script>
  import Logo from '@/components/Logo.vue';
  
  export default {
    data() {
      return {
        mostrarMensagem: true, 
      };
    },
    methods: {
      voltar() {
        this.$router.push({ name: 'Home' });
      },
    },
    components: {
      Logo,
    },
    mounted() {
      setTimeout(() => {
        this.mostrarMensagem = false;
        this.$router.push({ name: 'Home' }); 
      }, 1500);
    },
  };
  </script>
  
  <style scoped>
  .align-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .vh-100 {
    min-height: 100vh;
  }
  </style>
  