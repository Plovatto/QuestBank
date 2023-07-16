<template>
 <v-app-bar flat v-if="!showLogin">

  <template v-slot:append>
   
    <v-icon @click="close" color="blue">mdi-close-circle</v-icon>
    
  </template>
</v-app-bar> 
<v-main>
  <v-app>
   
    <v-container>
<Logo />
<h4 class="text-h6 text-blue font-weight-bold text-center">Tudo pronto para começar?</h4>
<h4 class="mt-2 mb-13 text-center font-weight-medium text-break">Informe seu email e senha para acessar sua conta</h4>
    <v-container> <v-container>
<Email/>
<Senha/></v-container>
<btnEntrar/> </v-container>  
   </v-container>

 

  </v-app>
</v-main>
    
</template>

<script>
  import Logo from '@/components/Logo.vue';
  import Email from '@/components/telaLogin/Email.vue';
  import Senha from '@/components/telaLogin/Senha.vue';
  import btnEntrar from '@/components/telaLogin/btnEntrar.vue';

import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({

    setup() {
  const route = useRoute();
  const router = useRouter();

  const close = () => {
    if (route.path !== '/Inicio') {
      router.push('/Inicio');
    }
  };

  return {
    close
  };
}, components: {
   Logo,Email,Senha,btnEntrar,
  },
});


 
 

</script>
<style>
*{
font-family: 'Inter', sans-serif;
}
</style>