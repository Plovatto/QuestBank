<template>
    <v-app-bar flat style="position: fixed;">
  <img height="30" src="@/assets/logo.svg" class="ml-3">
  <v-app-bar-title id="ap" class="text-blue text-h5 font-weight-bold">
    Quest Bank
  </v-app-bar-title>
  <v-btn @click="home" id="ap" class="text-blue d-sm-hidden" value="recent">
    <v-icon class="mr-1" color="blue">mdi-home</v-icon>
    Inicio
  </v-btn>
  <v-btn @click="perfil"  id="ap2" value="nearby" class="text-blue d-sm-hidden">
    <v-icon class="mr-1" color="blue">mdi-account</v-icon>
    Perfil
  </v-btn>
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



</template>

<script>
import Nav from '@/components/Nav.vue';

import cardperfil from '@/components/telaPerfil/cardperfil.vue';
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({  components: {

    Nav,
  
    cardperfil,
  },
  data: () => ({ value: 1 }),
  setup() {
    const route = useRoute();
    const router = useRouter();



    const perfil = () => {
      if (route.path !== '/Perfil') {
        router.push('/Perfil');
      }
    };

    const home = () => {
      if (route.path !== '/Home') {
        router.push('/Home');
      }
    };

    return {
      perfil,
      home,
    };
  },

});

</script>