
<template>
  
  <v-app-bar flat >
  
    <v-app-bar-title class="text-blue text-subtitle-1 font-weight-medium">
      Quest Bank
    </v-app-bar-title>
    <template v-slot:append>
     
        <v-icon>mdi-dots-vertical</v-icon>
      
    </template>
  </v-app-bar> 
<v-container></v-container>
  <v-container class="mt-15  pt-15 d-flex flex-column justify-center align-center">
  <v-container >
      <v-img  src="../assets/logo.svg"  height="170"/>
    </v-container>

    <v-container class="mt-5 d-flex flex-column justify-center align-center">
      <h2 class="mt-8 text-center font-weight-black">Recursos educacionais, e muito mais, sem limites</h2>
      <h4 class="mt-4 text-center font-weight-medium text-break" style="max-width: 160px;">Questões na palma de sua mão</h4>
    </v-container>

    <v-container class="mt-auto d-flex justify-end align-self-end">
      <v-btn class="mt-15 text-capitalize text-h6 bg-blue font-weight-black" block rounded="xl" size="x-large" @click="login" >Vamos lá</v-btn>
    </v-container>

    <v-progress-circular indeterminate color="blue" v-if="progressVisible"></v-progress-circular>
  

    </v-container>




</template>

<script>
  
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const progressVisible = ref(false);

    const login = () => {
      progressVisible.value = true;
      const delay = 2000;

      setTimeout(() => {
      router.push('/Login'); 
      }, delay);
    };

    return {
      progressVisible,
      login,
    };
  },
});
</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
*{
  font-family: 'Inter', sans-serif;
}
h4{
 font-family: 'IBM Plex Sans Thai', sans-serif;
}
v-app-bar-title{
font-family: 'IBM Plex Sans Thai', sans-serif;}
</style>