<template> 

<v-icon class="custom"  color="blue"  
:class="{ 'animated-btn': animateButton }"
@click="abrirCriarTopico" 
@mouseover="animateButton = true"
@mouseleave="resetAnimation">mdi-plus-circle</v-icon>
</template>
<style>
  .custom{
    transition: all 0.3s;
  }
  .animated-btn {
    transform: scale(1.5);
  }
  </style>
  
  <script>
  export default {
    data() {
      return {
        animateButton: false,
      };
    },
    methods: {
      resetAnimation() {
        this.animateButton = false;
      },
      abrirCriarTopico() {
      this.$router.push({ name: 'CriarTopico' });
    },
    },
  };
  </script>