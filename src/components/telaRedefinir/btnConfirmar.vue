<template> 
    <v-container class="text-center">
    <v-container class="mt-auto d-flex justify-center align-self-center">
        <v-btn  class="mt-8 text-capitalize text-h6 bg-blue font-weight-black" block rounded="xl" size="x-large" @click="entrar">Confirmar</v-btn>
    
    </v-container>
    <v-progress-circular class="mt-2" indeterminate color="blue" v-if="progressVisible"></v-progress-circular>
    </v-container></template>
    <script>
      
    import { defineComponent, ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';
    
    export default defineComponent({
      setup() {
        const route = useRoute();
        const router = useRouter();
        const progressVisible = ref(false);
    
        const entrar = () => {
          progressVisible.value = true;
          const delay = 2000;
    
          setTimeout(() => {
          router.push('/Login'); 
          }, delay);
        };
    
        return {
          progressVisible,
          entrar,
        };
      },
    });
    </script>