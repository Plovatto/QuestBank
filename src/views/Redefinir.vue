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
<h4 class="text-h6 text-blue font-weight-bold text-center">Redefina sua senha!</h4>
<h4 class="mt-2  text-center font-weight-medium text-break">Confirme seu email para poder redefinir sua senha</h4>
  <v-container>
<v-container>
  <v-form v-model="valid">
    <v-text-field
    v-model="Email"
    type="email"
    name="Email"
    density="compact"
    variant="solo"
    label="Email"
    required
    :class="{ 'invalid-input': InvalidEmail }"
    :error-messages="InvalidEmail ? ['O Email é obrigatório.'] : []"
    @input="handleEmailInput"
  ></v-text-field>
                 
</v-form>
<novaSenha/>
<btnConfirmar/> 
</v-container>  
   </v-container>
</v-container>
 

  </v-app>
</v-main>
    
 

</template>




<script>
  import Logo from '@/components/Logo.vue';
  import novaSenha from '@/components/telaRedefinir/novaSenha.vue';
  import btnConfirmar from '@/components/telaRedefinir/btnConfirmar.vue';

import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({

    setup() {
  const route = useRoute();
  const router = useRouter();

  const close = () => {
    if (route.path !== '/Login') {
      router.push('/Login');
    }
  };

  return {
    close
  };
}, components: {
   Logo,novaSenha,btnConfirmar,
  },
});
</script>


  <style>
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
h4{
  font-family: 'Inter', sans-serif;
}
h3{
font-family: 'IBM Plex Sans Thai', sans-serif;
}
a{cursor: pointer;}

</style>


