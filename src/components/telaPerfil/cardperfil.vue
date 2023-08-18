<template><div id="btn">
  <v-container class="mt-8">
    <h5 class="ml-2 text-blue">Configurações do perfil</h5>
    <h6 class="ml-2 font-weight-medium">Alterar detalhes da conta</h6>
    <div class="mt-2 bg-white elevation-3 rounded-xl" height="700" width="190">
      <v-card color="transparent" elevation="0" class="mr-2 ml-2" height="400" width="300">
        <v-container>
               <br>
            <label class="font-weight-bold text-blue">Email</label>
            <v-text-field disabled variant="underlined">{{ userName }} </v-text-field>
            <label class="text-caption">Você pode alterar seu nome</label>
          <br />
          <br /><br />
          <label class="font-weight-bold text-blue" >Email</label>
          <v-text-field disabled variant="underlined"> {{ userEmail }}</v-text-field>
          
          <label class="text-caption">Você pode alterar seu email</label>
          
        </v-container>
      </v-card>
    </div>
    
  </v-container><v-btn :height="50" :width="240" class="bg-blue rounded-pill text-overline font-weight-bold" >SALVAR ALTERAÇÔES</v-btn>
<a class="text-black text-overline mt-2 font-weight-bold" @click="close" >SAIR</a></div>
</template>

<script>
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
export default defineComponent({

  

  name: 'ProfileSettings',
  data() {
    return {
      userEmail: '',
      userName: '',
    };
  },
  created() {
    this.userEmail = localStorage.getItem('userEmail') || '';
    this.userName = localStorage.getItem('userName') || '';
  },  setup() {
    const route = useRoute();
    const router = useRouter();

    const close = () => {
      if (route.path !== '/Inicio') {
  
        clearLocalStorage();
        router.push('/Inicio');
      }
    };

    const clearLocalStorage = () => {
      localStorage.removeItem('token');
     
    };

    return {
      close,
    };}
});
</script>

<style>
.bg-white {
  border: none;

}
#btn{
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
}
</style>
