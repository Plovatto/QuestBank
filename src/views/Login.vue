<template>
 <v-app-bar flat v-if="!showLogin">

  <template v-slot:append>
   
    <v-icon @click="close" color="blue">mdi-close-circle</v-icon>
    
  </template>
</v-app-bar> 
<v-main>
  <v-app>
   
   <v-container>
<Logo />
<h4 class="text-h6 text-blue font-weight-bold text-center">Tudo pronto para começar?</h4>
<h4 class="mt-2 mb-13 text-center font-weight-medium text-break">Informe seu email e senha para acessar sua conta</h4>
    <v-container> <v-container>


      <div class=" mt-6 text-subtitle-1 text-medium-emphasis"></div>
  <v-form v-model="valid">
    <v-text-field
    v-model="Email"
    type="email"
    name="Email"
    density="compact"
    variant="solo"
    label="Email"
    required
    :class="{ 'invalid-input': InvalidEmail }"
    :error-messages="InvalidEmail ? ['O Email é obrigatório.'] : []"
    @input="handleEmailInput"
  ></v-text-field>
                 
</v-form>





<v-text-field
    class="mt-1"
    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
    :type="visible ? 'text' : 'password'"
    density="compact"
    variant="solo"
    label="Senha"
    name="Senha"
    v-model="Password"
    @click:append-inner="visible = !visible"
    :class="{ 'invalid-input': InvalidSenha }"
    :error-messages="InvalidSenha ? ['A Senha é obrigatória.'] : []"
    @input="handlePasswordInput"
  ></v-text-field>
  <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-end">
            
  <a @click="goToLogin" class="text-caption text-decoration-none text-blue" rel="noopener noreferrer" target="_blank">
  Esqueceu a senha?
  </a>

  </div>
                        
                         
<v-container class="text-center">
<v-container class="mt-auto d-flex justify-center align-self-center">
   

</v-container>   
 
<h4  class=" text-red error-message text-subtitle-1 " v-if="invalid">Email ou senha inválida</h4>  
<v-btn
    class="mt-5 text-capitalize text-h6 bg-blue font-weight-black"
    block
    rounded="xl"
    size="x-large"
    @click="Login"
  >
    Entrar
  </v-btn>
<v-progress-circular class="mt-7" indeterminate color="blue" v-if="progressVisible"></v-progress-circular>
</v-container>

                        
</v-container> 
</v-container>
</v-container>
 

  </v-app> 
</v-main>
    
</template>



<script>
import Logo from '@/components/Logo.vue';
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  components: {
    Logo,
  },

  setup() {
    const route = useRoute();
    const router = useRouter();
    const progressVisible = ref(false);
    const progressDisplayTime = 2000;

    const visible = ref(false);
    const Email = ref('');
    const Password = ref('');
    const InvalidEmail = ref(false);
    const InvalidSenha = ref(false);
    const invalid = ref(false);

    const EmailValido = (email) => {
      const emailRegex = /.+/;
      return emailRegex.test(email);
    };

    const handleEmailInput = () => {
     
      if (Email.value.trim()) {
        InvalidEmail.value = false;
      }
    };
    
    const close = () => {
      if (route.path !== '/Inicio') {
        router.push('/Inicio');
      }
    };

    const handlePasswordInput = () => {
      
      if (Password.value.trim()) {
        InvalidSenha.value = false;
      }
    };

    const goToLogin = () => {
      if (route.path !== '/Redefinir') {
        router.push('/Redefinir');
      }
    };

    const Login = () => {
     
      if (!Email.value.trim() || !Password.value.trim()) {
        InvalidEmail.value = !Email.value.trim();
        InvalidSenha.value = !Password.value.trim();
        return;
      }

      if (!EmailValido(Email.value)) {
        InvalidEmail.value = true;
        InvalidSenha.value = false;
        return;
      }

      invalid.value = false;
      const formData = {
        email: Email.value,
        senha: Password.value,
      };

      progressVisible.value = true;

      axios
        .post('http://localhost:3000/user/login', formData)
        .then((response) => {
          console.log(response.data);
          if (response.data.auth) {
          
            localStorage.setItem('token', response.data.token);

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
      Email,
      Password,
      InvalidEmail,
      InvalidSenha,
      invalid,
      goToLogin,
      Logo,
      progressVisible,
      handleEmailInput,
      handlePasswordInput,
      Login,
      close
    };
  },
});
</script>



<style>
*{
font-family: 'Inter', sans-serif;
}.v-btn:hover{
box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
transition: 0.3s;
transform: scale(1.05);
}
</style>