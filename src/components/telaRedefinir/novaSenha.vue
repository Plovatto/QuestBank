<template>

<v-text-field
              class=""
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              density="compact"
              variant="solo"
              label="Nova senha"
              @click:append-inner="visible = !visible"
            >
</v-text-field>
     
            <v-text-field
              class="mt-1"
              :append-inner-icon="visible2 ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible2 ? 'text' : 'password'"
              density="compact"
              variant="solo"
              label="Confirme a senha"
              @click:append-inner="visible2 = !visible2"
            >
            </v-text-field>
            <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-end">
            
            <h5 class="text-caption text-decoration-none text-blue" rel="noopener noreferrer" target="_blank">
                Caracteres não permitidos: */.,;:...
            </h5>

          </div>
</template>
<script>
  export default {
    data: () => ({
      visible: false,
      visible2: false,
    }),
  }
</script>