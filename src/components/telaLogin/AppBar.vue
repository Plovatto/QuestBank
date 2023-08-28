<template>
  <v-app-bar flat v-if="!showLogin">
    <template v-slot:append>
      <v-icon @click="closeApp" color="blue">mdi-close-circle</v-icon>
    </template>
  </v-app-bar>
</template>
  
<script>
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();

    const closeApp = () => {
      if (route.path !== '/Inicio') {
        router.push('/Inicio');
      }
    };

    return {
      closeApp,
    };
  },
});
</script>
  