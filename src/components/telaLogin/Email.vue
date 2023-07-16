<template>
    



  <div class="mt-8 text-subtitle-1 text-medium-emphasis"></div>
  <v-form v-model="valid">
  <v-text-field
  v-model="email"
  :rules="emailRules"
    density="compact"
    variant="solo"
    label="Email"
    required
  ></v-text-field>
</v-form>



</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
*{
font-family: 'IBM Plex Sans Thai', sans-serif;
}
</style>
<script>
  export default {
    data: () => ({
      valid: false,
      email: '',
      emailRules: [
        value => {
          if (value) return true

          return 'E-mail is requred.'
        },
        value => {
          if (/.+@.+\..+/.test(value)) return true

          return 'E-mail must be valid.'
        },
      ],
    }),
  }
</script>