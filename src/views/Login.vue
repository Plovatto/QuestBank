<template>
  <v-main>
    <v-app>
      <v-container>
        <Logo />
        <h4 class="text-h6 text-blue font-weight-bold text-center">Tudo pronto para começar?</h4>
        <h4 class="mt-2 mb-13 text-center font-weight-medium text-break">Informe seu email e senha para acessar sua conta
        </h4>
        <LoginForm />
      </v-container>
    </v-app>

    <AppBar />
  </v-main>
</template>

<script>
import Logo from '@/components/Logo.vue';
import AppBar from '@/components/telaLogin/AppBar.vue';
import LoginForm from '@/components/telaLogin/LoginForm.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    Logo,
    AppBar,
    LoginForm,

  },
});
</script>

<style>
* {
  font-family: 'Inter', sans-serif;
}

.v-btn:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
  transform: scale(1.05);
}
</style>
