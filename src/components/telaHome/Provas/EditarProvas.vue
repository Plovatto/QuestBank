<template>
    <v-container class="mt-8">
        <Nav />
        <v-card elevation="0">
            <v-card-title class="text-blue font-weight-bold text-center text-h5">Editar Avaliação</v-card-title>
            <v-card-text>
                <v-form ref="form" @submit="editarProva">
                    <v-textarea label="Nome da avaliação" v-model="enunciado" outlined rows="4"></v-textarea>
                    <v-select label="Tipo" v-model="tipo" :items="['Objetiva', 'Dissertativa', 'Ambas']"
                        outlined></v-select>
                    <v-textarea label="Descrição" v-model="descricao" outlined rows="4"></v-textarea>
                </v-form>
            </v-card-text>
            <v-card-actions class="d-flex justify-center align-items-center">
                <v-btn @click="editarProva" height="50" width="240" class="bg-blue rounded-pill text-h6">Salvar</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
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
            id_prova: null,
            enunciado: '',
            tipo: '',
            descricao: '',
        };
    },
    async mounted() {
        this.id_prova = this.$route.params.id;
        await this.carregarDetalhesProva();
    },
    methods: {
        async carregarDetalhesProva() {
            try {
                const response = await axios.get(`https://questbankapi.onrender.com/obterProva/${this.id_prova}`);
                if (response.data.status === 'success') {
                    const prova = response.data.prova[0];
                    this.enunciado = prova.enunciado;
                    this.tipo = prova.tipo;
                    this.descricao = prova.descricao;
                } else {
                    console.error('Erro ao carregar detalhes da prova:', response.data.msg);
                }
            } catch (error) {
                console.error('Erro ao carregar detalhes da prova:', error);
            }
        },
        async editarProva() {
            try {
                const dadosEditados = {
                    enunciado: this.enunciado,
                    tipo: this.tipo,
                    descricao: this.descricao,
                };

                const response = await axios.put(`https://questbankapi.onrender.com/editarProva/${this.id_prova}`, dadosEditados);
                if (response.data.status === 'success') {
                    console.log('Prova editada com sucesso');
                    this.$router.push('/telaConfimEdit');
                } else {
                    console.error('Erro ao editar a prova:', response.data.msg);
                }
            } catch (error) {
                console.error('Erro ao editar a prova:', error);
            }
        },
    },
};
</script>