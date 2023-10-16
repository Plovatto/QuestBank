<template>
  <v-container>
    <div class=" mt-6 text-subtitle-1 text-medium-emphasis"></div>
    <v-form v-model="valid">
      <v-text-field v-model="email" type="email" name="Email" density="compact" variant="solo" label="Email" required
        :class="{ 'invalid-input': invalidEmail }" :error-messages="invalidEmail ? ['O Email é obrigatório.'] : []"
        @input="handleEmailInput"></v-text-field>

      <v-text-field class="mt-1" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'" density="compact" variant="solo" label="Senha" name="Senha"
        v-model="password" @click:append-inner="visible = !visible" :class="{ 'invalid-input': invalidPassword }"
        :error-messages="invalidPassword ? ['A Senha é obrigatória.'] : []" @input="handlePasswordInput"></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-end">
        <a @click="goToLogin" class="text-caption text-decoration-none text-blue" rel="noopener noreferrer"
          target="_blank">
          Esqueceu a senha?
        </a>
      </div>

      <v-container class="text-center">
        <v-container class="mt-auto d-flex justify-center align-self-center"></v-container>
        <i class="input-icon uil uil-lock-alt"></i>
        <h4 class="text-red error-message text-subtitle-1 " v-if="invalid">Email ou senha inválida</h4>
        <v-btn class="mt-5 text-capitalize text-h6 bg-blue font-weight-black" block rounded="xl" size="x-large"
          @click="login">
          Entrar
        </v-btn>
        <v-progress-circular class="mt-7" indeterminate color="blue" v-if="progressVisible"></v-progress-circular>
      </v-container>
    </v-form>
  </v-container>
</template>
  
<script>
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
axios.defaults.headers.common['x-access-token'] = localStorage.getItem('token');
axios.defaults.headers.common['perfil'] = localStorage.getItem('userPerfil');


export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const progressVisible = ref(false);
    const progressDisplayTime = 2000;

    const visible = ref(false);
    const email = ref('');
    const password = ref('');
    const invalidEmail = ref(false);
    const invalidPassword = ref(false);
    const invalid = ref(false);

    const validateEmail = (email) => {
      const emailRegex = /.+/;
      return emailRegex.test(email);
    };

    const handleEmailInput = () => {
      if (email.value.trim()) {
        invalidEmail.value = false;
      }
    };

    const handlePasswordInput = () => {
      if (password.value.trim()) {
        invalidPassword.value = false;
      }
    };

    const goToLogin = () => {
      if (route.path !== '/Redefinir') {
        router.push('/Redefinir');
      }
    };

    const login = () => {
      if (!email.value.trim() || !password.value.trim()) {
        invalidEmail.value = !email.value.trim();
        invalidPassword.value = !password.value.trim();
        return;
      }

      if (!validateEmail(email.value)) {
        invalidEmail.value = true;
        invalidPassword.value = false;
        return;
      }

      invalid.value = false;
      const formData = {
        email: email.value,
        senha: password.value,
      };

      progressVisible.value = true;

      axios
        .post('https://api-quest-bank.vercel.app/user/login', formData)
        .then((response) => {
          console.log(response.data);
          if (response.data.auth) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('userId', response.data.user.id);
            localStorage.setItem('userEmail', response.data.user.email);
            localStorage.setItem('userName', response.data.user.nome);
            localStorage.setItem('userPerfil', response.data.user.perfil);
            console.log(localStorage);
            const perfil = localStorage.getItem('userPerfil');
            console.log('Perfil:', perfil);
            setTimeout(() => {
              router.push('/Home');
              progressVisible.value = false;
            }, progressDisplayTime);
          } else {
            console.log('Credenciais inválidas');
            invalid.value = true;
            progressVisible.value = false;
          }
        })
        .catch((error) => {
          progressVisible.value = false;
        });
    };

    if (localStorage.getItem('token')) {
      router.push('/Home');
    }

    return {
      visible,
      email,
      password,
      invalidEmail,
      invalidPassword,
      invalid,
      goToLogin,
      progressVisible,
      handleEmailInput,
      handlePasswordInput,
      login,
    };
  },
});
</script>