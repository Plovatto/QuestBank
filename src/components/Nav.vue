<template>
  <v-app-bar flat>

    <img height="30" src="../assets/logo.svg" class="ml-8">
    <v-app-bar-title class="text-blue font-weight-medium">
      Quest Bank
    </v-app-bar-title>

    <template v-slot:append>
      <v-icon @click="Irhome" color="blue">mdi-close-circle</v-icon>


    </template>
  </v-app-bar>
</template>
<script>
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();

    const Irhome = () => {
      if (route.path !== '/Home') {
        router.push('/Home');
      }

    }; return {
      Irhome,
    };

  }
});


</script>



