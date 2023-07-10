<template>
<v-main>
    <v-app >
      <v-container  class="d-flex flex-column justify-center align-center">
      <v-container  class="">
       <v-img height="60" src="./logo.svg" class=""/>

     <h3 class="mt-1 text-h6 text-blue font-weight-medium text-center">Quest Bank</h3>
     <h4 class="mt-5 text-h6 text-blue font-weight-bold text-center">Tudo pronto para começar?</h4>
     <h4 class=" mt-4 text-center font-weight-medium text-break">Informe seu email e senha para acessar sua conta</h4>
     </v-container>
     <v-container  class="">
   
  <div>
    
 
    
      <div  class="rounded-pill rounded text-subtitle-1 text-medium-emphasis"></div>

        <v-text-field
    
        density="compact"
        variant="solo"
        label="Email"


        
      ></v-text-field>


      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
      Senha

        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Esqueceu a senha?</a>
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"

        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

   
   
      

   <v-container class="mt-auto d-flex justify-end align-self-end">
      <v-btn class="mt-5 text-capitalize text-h6 bg-blue font-weight-black" block rounded="xl" size="x-large" >Entrar</v-btn>
    </v-container>


 
    
   
  </div>

     </v-container>
     </v-container>
    </v-app>
    </v-main>
  </template>
  
  <script>

  </script>
  <style>
  @import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
h4{
  font-family: 'Inter', sans-serif;
}
h3{
font-family: 'IBM Plex Sans Thai', sans-serif;
}


</style>