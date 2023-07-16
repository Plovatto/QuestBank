<template>
            <v-card-text>
          <v-text-field
          class="text-capitalize"
            :loading="loading"
            width="500"
            elevation="2"
            density="compact"
            variant="outlined"
            label="Pesquisar"
            append-inner-icon="mdi-magnify"
            single-line
            hide-details
            rounded="lg"
            @click:append-inner="onClick"
          ></v-text-field>
        </v-card-text>
</template>
<script>
  export default {
    data: () => ({
      loaded: false,
      loading: false,
    }),

    methods: {
      onClick () {
        this.loading = true

        setTimeout(() => {
          this.loading = false
          this.loaded = true
        }, 2000)
      },
    },
  }
</script>