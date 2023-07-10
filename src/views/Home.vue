
<template>

  <v-container  class="d-flex flex-column justify-center align-center">
    <v-container v-if="!showLogin">
      <v-img src="./logo.png" height="170"></v-img>
    </v-container>

    <v-container class="d-flex flex-column justify-center align-center" v-if="!showLogin">
      <h2 class="mt-8 text-center font-weight-black">Recursos educacionais, e muito mais, sem limites</h2>
      <h4 class="mt-4 text-center font-weight-medium text-break" style="max-width: 160px;">Questões na palma de sua mão</h4>
    </v-container>

    <v-container class="mt-auto d-flex justify-end align-self-end">
      <v-btn class="mt-5 text-capitalize text-h6 bg-blue font-weight-black" block rounded="xl" size="x-large" @click="openLogin" v-if="!showLogin">Vamos lá</v-btn>
    </v-container>

    <v-progress-circular v-if="showProgress" indeterminate color="cyan"></v-progress-circular>

    <v-container v-if="showLogin">
    <Login />
    </v-container>
  </v-container>
</template>

<script>
import Comecar from '@/components/Comecar.vue';
  import Login from '@/components/Login.vue';
  

export default {
  data() {
    return {
      showProgress: false,
      showLogin: false
    };
  },
  methods: {
    openLogin() {
      this.showProgress = true;

      setTimeout(() => {
        this.showProgress = false;
        this.showLogin = true;
      }, 2000);
    }
  },
  components: {
   Login,Comecar
  },
};
</script>
