<template>


<div>

<v-text-field
            class="mt-1"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            variant="solo"
            label="Senha"
            @click:append-inner="visible = !visible"
          >
</v-text-field>

          <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-end">
            
            <a @click="goToLogin" class="text-caption text-decoration-none text-blue" rel="noopener noreferrer" target="_blank">
              Esqueceu a senha?
            </a>

          </div>

</div>

</template>

<script>
import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
    data: () => ({
      visible: false,
    }),
    setup() {
  const route = useRoute();
  const router = useRouter();

  const goToLogin = () => {
    if (route.path !== '/Redefinir') {
      router.push('/Redefinir');
    }
  };

  return {
    goToLogin
  };
},
});
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
*{
font-family: 'IBM Plex Sans Thai', sans-serif;
}
</style>