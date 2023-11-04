<template><br><br>
<Logo/><br>
    <h4 class="text-h6 text-blue font-weight-bold text-center">Confirme seu email!</h4>
    <h4 class="mt-2 text-center font-weight-medium text-subtitle-1 text-break">Confirme seu email para receber um código de verificação em seu email</h4>
    <v-container>
        <v-container>
            <v-form v-model="valid">
                <v-text-field v-model="email" type="email" name="email" density="compact" variant="solo" label="Email"
                    required :class="{ 'invalid-input': invalidEmail }"
                    :error-messages="invalidEmail ? ['O Email é obrigatório.'] : []"
                    @input="handleEmailInput"></v-text-field>
<v-snackbar v-model="snackbar.show" :timeout="snackbar.timeout" :color="snackbar.color">
        {{ snackbar.text }}
    </v-snackbar>
                <v-container class="text-center"> 
                    
                    <v-container class="mt-auto d-flex justify-center align-self-center">
                        <v-btn class="mt-8 text-capitalize text-h6 bg-blue font-weight-black" block rounded="xl"
                            size="x-large" @click="onConfirm">Confirmar</v-btn>
                    </v-container>
                    <v-progress-circular class="mt-2" indeterminate color="blue"
                        v-if="progressVisible"></v-progress-circular>
                </v-container>
            </v-form>
        </v-container>
    </v-container>
   
</template>

<script>
import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Logo from '@/components/Logo.vue';
export default defineComponent({
   components:{
Logo
   },
    setup() {
        const route = useRoute();
        const router = useRouter();
        const progressVisible = ref(false);
        const email = ref('');
        const invalidEmail = ref(false);
        const snackbar = ref({
            show: false,
            text: '',
            timeout: 3000,
            color: '',
        });

        const validateEmail = (email) => {
            const emailRegex = /.+/;
            return emailRegex.test(email);
        };

        const handleEmailInput = () => {
            if (email.value.trim()) {
                invalidEmail.value = false;
            }
        };

        const close = () => {
            if (route.path !== '/Login') {
                router.push('/Login');
            }
        };

        const onConfirm = () => {
            if (!email.value.trim()) {
                invalidEmail.value = true;
                return;
            }

            if (!validateEmail(email.value)) {
                invalidEmail.value = true;
                return;
            }

            progressVisible.value = true;

            axios
                .post('https://api-quest-bank.vercel.app/user/reset/senha/request', { email: email.value })
                .then((response) => {
                    console.log(response.data);

                    setTimeout(() => {
                        progressVisible.value = false;
                        router.push('/redefinir');
                    }, 2000);
                })
                .catch((error) => {
                    progressVisible.value = false;
                    console.error(error);
                    snackbar.value.show = true;
                    snackbar.value.text = 'Email não encontrado';
                    snackbar.value.color = 'error';
                });
        };

        return {
            email,
            invalidEmail,
            progressVisible,
            handleEmailInput,
            close,
            onConfirm,
            snackbar,
        };
    },
});
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans+Thai:wght@100;200;300;400;500;600;700&family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');

h4 {
    font-family: 'Inter', sans-serif;
}

h3 {
    font-family: 'IBM Plex Sans Thai', sans-serif;
}

a {
    cursor: pointer;
}
</style>
