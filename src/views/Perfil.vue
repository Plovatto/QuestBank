<template>
  <v-app-bar flat>

    <img height="30" src="../assets/logo.svg" class="ml-8">
    <v-app-bar-title class="text-blue font-weight-medium">
      Quest Bank
    </v-app-bar-title>

    <template v-slot:append>

      <v-icon icon="mdi-account-circle" color="blue" size="x-large"></v-icon>

    </template>
  </v-app-bar>
  <v-container></v-container>
  <v-container class="mt-10"></v-container>
  <v-app>
    <v-container class="text-center">
      <Logo />
      <h3 class="text-blue font-weight-black text-center" style="font-size: 21px;">Informações da sua conta!</h3>
      <h4 class="mt-2 text-center font-weight-medium text-break " style="font-size: 15px;">Aqui você pode editar e ver as
        informações de sua conta</h4>
    </v-container>
    <v-container>
      <cardperfil />
    </v-container>


  </v-app>


  <NavBar />
</template>
<script>

import Nav from '@/components/Nav.vue';
import NavBar from '@/components/navBar.vue';
import cardperfil from '@/components/telaPerfil/cardperfil.vue';

export default {
  components: {

    Nav,
    NavBar,
    cardperfil,
  },
};
</script>
