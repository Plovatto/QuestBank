<template>
  <div v-if="mostrarMensagem">
    <br><br>
    <Logo />
    <v-container class="text-center">
      <h1 class="text-blue font-weight-bold text-h3" style="">Excluido!</h1>
      <br>
      <br><br>
      <h3 class="font-weight-medium">Suas informações foram excluídas com sucesso!</h3>
      <br><br><br><br>
      <v-btn :height="50" :width="240" class="bg-blue rounded-pill text-overline font-weight-bold" @click="voltar">Ok</v-btn>
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
      }, 2000);
  },
};
</script>
