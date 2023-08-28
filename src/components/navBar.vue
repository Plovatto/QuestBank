<template>
  <div>

    <v-bottom-navigation class="text-blue pb-3" :elevation="7" mode="shift">
      <v-btn @click="home" value="recent">
        <v-icon class="mb-1" color="blue">mdi-home</v-icon>

        Inicio
      </v-btn>

      <v-btn value="favorites" class="ml-15 text-blue">
        <v-icon class="mb-1" color="blue">mdi-magnify</v-icon>

        Pesquisar
      </v-btn>

      <v-btn @click="perfil" value="nearby" class="ml-15 text-blue">
        <v-icon class="mb-1" color="blue">mdi-account</v-icon>

        Perfil
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>
<script>

import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
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