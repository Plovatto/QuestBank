<template>
    <div>
        <br><br><br>
        <Nav />
        <v-container class="mt-12">
            <v-card class="mx-auto" max-width="800">
                <v-card-title class="text-blue font-weight-bold">Detalhes da Prova</v-card-title>
                <v-card-text v-if="prova">
                    <p><span class="text-blue font-weight-bold">ID da Prova:</span> {{ prova.id_prova }}</p>
                    <p><span class="text-blue font-weight-bold">Nome da Prova:</span> {{ prova.enunciado }}</p>
                    <p><span class="text-blue font-weight-bold">Criado por:</span> {{ prova.criado_por.professor_nome }}</p>
                    <p><span class="text-blue font-weight-bold">Descrição:</span> {{ prova.descricao }}</p>
                </v-card-text>

                <v-row justify="center">
                    <v-col cols="auto" class="mb-2">
                        <v-btn class="bg-blue" elevation="2" rounded="xl" max-width="200" width="100%" height="40"
                            @click="excluirProva(prova.id_prova)">Excluir</v-btn>
                    </v-col>
                    <v-col cols="auto" class="mb-2">
                        <v-btn class="bg-blue" elevation="2" rounded="xl" max-width="200" width="100%" height="40">
                            <router-link v-if="prova" :to="`/editar-provas/${prova.id_prova}`" class="bg-blue" elevation="2"
                                rounded="xl" max-width="500" width="100%" height="40">Editar</router-link></v-btn>
                    </v-col>
                </v-row>
            </v-card>
        </v-container>
    </div>
</template>
  
<script>
import Nav from '@/components/Nav.vue';
import axios from 'axios';

export default {
    components: {
        Nav,
    },
    data() {
        return {
            provaId: null,
            prova: null,
        };
    },
    mounted() {
        this.provaId = this.$route.params.id;
        this.carregarDetalhesProva();
    },
    methods: {
        async carregarDetalhesProva() {
            try {
                const response = await axios.get(`https://questbankapi.onrender.com/obterProva/${this.provaId}`);
                if (response.data.status === 'success') {
                    this.prova = response.data.prova[0];
                } else {
                    console.error('Erro ao carregar detalhes da prova:', response.data.msg);
                }
            } catch (error) {
                console.error('Erro ao carregar detalhes da prova:', error);
            }
        },
        async excluirProva(provaId) {
            try {
                const response = await axios.delete(`https://questbankapi.onrender.com/excluirProva/${provaId}`);
                if (response.data.status === 'success') {
                    this.$router.push('/telaConfimExcluir');
                } else {
                    console.error('Erro ao excluir a prova:', response.data.msg);
                }
            } catch (error) {
                console.error('Erro ao excluir a prova:', error);
            }
        },
    },
};
</script>
  