<template>
  

<v-main>
    <v-app>
      
      <v-container v-if="!showLogin">
        <v-container  class="d-flex flex-column justify-center align-center">
        <v-container class="">
          <v-img height="65" src="./logo.svg" class="" />

          <h3 class="mt-1 text-h5 text-blue font-weight-medium text-center">Quest Bank</h3>
          <h4 class="mt-10 text-h6 text-blue font-weight-bold text-center">Redefina sua senha!</h4>
          <h4 class="mt-4 text-center font-weight-medium text-break">Confirme seu email para poder redefinir sua senha</h4>
        </v-container>
        <v-container class="">

          <div>

            <div class="mt-8text-subtitle-1 text-medium-emphasis"></div>

            <v-text-field
              density="compact"
              variant="solo"
              label="Email"
            ></v-text-field>

            <v-text-field
              class="mt-1"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              variant="solo"
              label="Nova senha"
              @click:append-inner="visible = !visible"
            ></v-text-field>
            <v-text-field
              class="mt-1"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              variant="solo"
              label="Confirme a senha"
              @click:append-inner="visible = !visible"
            ></v-text-field>

            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-end">
              <h6 class="text-caption text-decoration-none text-blue" rel="noopener noreferrer" target="_blank">
                Caracteres não permitidos: */.,;:...
              </h6>
            </div>

            <v-container class="mt-auto d-flex justify-end align-self-end">
              <v-btn @click="openLogin" v-if="!showLogin"  class="mt-10 text-capitalize text-h6 bg-blue font-weight-black" block rounded="xl" size="x-large" >Entrar</v-btn>
            
          </v-container>
          </div>
          
        </v-container><v-progress-circular v-if="showProgress" indeterminate color="cyan"/>
      </v-container> </v-container>
      <v-container v-if="showLogin">
         <Comecar/>
      </v-container>
   

    </v-app>
  </v-main>
 

</template>

<script>

  import Comecar from '@/components/Comecar.vue';

export default {
  data() {
    return {
      showProgress: false,
      showLogin: false,
     
    };
  },
  methods: {
    openLogin() {
      this.showProgress = true;

      setTimeout(() => {
        this.showProgress = false;
        this.showLogin = true;
      }, 2000);
    },
    
  },  components: {
   Comecar,
  },
};
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


