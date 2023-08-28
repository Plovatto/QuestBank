<template>
    <h4 class="text-h6 text-blue font-weight-bold text-center">Redefina sua senha!</h4>
    <h4 class="mt-2 text-center font-weight-medium text-break">Confirme seu email para poder redefinir sua senha</h4>
    <v-container>
        <v-container>
            <v-form v-model="valid">
                <v-text-field v-model="email" type="email" name="email" density="compact" variant="solo" label="Email"
                    required :class="{ 'invalid-input': invalidEmail }"
                    :error-messages="invalidEmail ? ['O Email é obrigatório.'] : []"
                    @input="handleEmailInput"></v-text-field>

                <v-text-field class="" :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'" density="compact" variant="solo" label="Nova senha"
                    v-model="novaSenha" @click:append-inner="togglePasswordVisibility"
                    :class="{ 'invalid-input': invalidPassword }"
                    :error-messages="invalidPassword ? ['A Senha é obrigatória.'] : []"
                    @input="handlePasswordInput"></v-text-field>

                <v-text-field class="mt-1" :append-inner-icon="visible2 ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible2 ? 'text' : 'password'" density="compact" variant="solo" label="Confirme a senha"
                    v-model="confirmSenha" @click:append-inner="visible2 = !visible2"
                    :class="{ 'invalid-input': invalidConfirmPassword }"
                    :error-messages="invalidConfirmPassword ? ['Confirmação de senha é obrigatória.'] : []"
                    @input="handleConfirmPasswordInput"></v-text-field>

                <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-end">
                    <h5 class="text-caption text-decoration-none text-blue" rel="noopener noreferrer" target="_blank">
                        Caracteres não permitidos: */.,;:...
                    </h5>
                </div>

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

export default defineComponent({

    setup() {
        const route = useRoute();
        const router = useRouter();
        const progressVisible = ref(false);
        const visible = ref(false);
        const visible2 = ref(false);
        const email = ref('');
        const novaSenha = ref('');
        const confirmSenha = ref('');
        const invalidEmail = ref(false);
        const invalidPassword = ref(false);
        const invalidConfirmPassword = ref(false);

        const validateEmail = (email) => {
            const emailRegex = /.+/;
            return emailRegex.test(email);
        };
        const togglePasswordVisibility = () => {
            visible.value = !visible.value;
        };
        const handleEmailInput = () => {
            if (email.value.trim()) {
                invalidEmail.value = false;
            }
        };

        const handlePasswordInput = () => {
            if (novaSenha.value.trim()) {
                invalidPassword.value = false;
            }
        };

        const handleConfirmPasswordInput = () => {
            if (confirmSenha.value.trim()) {
                invalidConfirmPassword.value = false;
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

            if (!novaSenha.value.trim()) {
                invalidPassword.value = true;
                return;
            }

            if (!confirmSenha.value.trim()) {
                invalidConfirmPassword.value = true;
                return;
            }

            if (novaSenha.value !== confirmSenha.value) {
                invalidConfirmPassword.value = true;
                return;
            }

            const formData = {
                email: email.value,
                novaSenha: novaSenha.value,
                confirmSenha: confirmSenha.value,
            };

            progressVisible.value = true;

            axios
                .put('https://api-questbank.onrender.com/reset', formData)
                .then((response) => {
                    console.log(response.data);

                    setTimeout(() => {
                        progressVisible.value = false;
                        router.push('/Login');
                    }, 2000);
                })
                .catch((error) => {
                    progressVisible.value = false;
                    console.error(error);
                });
        };


        return {
            visible,
            visible2,
            email,
            novaSenha,
            confirmSenha,
            invalidEmail,
            invalidPassword,
            invalidConfirmPassword,
            progressVisible,
            handleEmailInput,

            handleConfirmPasswordInput,
            close,
            onConfirm,
            invalidPassword,
            handlePasswordInput,
            togglePasswordVisibility,
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
