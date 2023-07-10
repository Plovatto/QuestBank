<template>
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
    
 
    
      <div class="text-subtitle-1 text-medium-emphasis">Email</div>

      <v-text-field class="rounded-xl" density="compact"
        variant="outlined"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password

        <a
          class="text-caption text-decoration-none text-blue"
          href="#"
          rel="noopener noreferrer"
          target="_blank"
        >
          Forgot login password?</a>
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
      ></v-text-field>

   
   
      

      <v-btn
        block
        class="mb-8"
        color="blue"
        size="large"
        variant="tonal"
      >
        Log In
      </v-btn>

 
    
   
  </div>

     </v-container>
     </v-container>
    </v-app>
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