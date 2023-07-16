<template>
    <div>
      
      <v-bottom-navigation  class="text-blue pb-3" :elevation="7" mode="shift">
  <v-btn value="recent" >
    <v-icon class="mb-1" color="blue">mdi-home</v-icon>

    Inicio
  </v-btn>

  <v-btn value="favorites" class="ml-15 text-blue">
    <v-icon class="mb-1" color="blue">mdi-magnify</v-icon>

    Pesquisar
  </v-btn>

  <v-btn value="nearby" class="ml-15 text-blue">
    <v-icon class="mb-1" color="blue">mdi-account</v-icon>

    Perfil
  </v-btn>
</v-bottom-navigation></div>
</template>
<script>
  export default {
    data: () => ({ value: 1 }),
  }
</script>