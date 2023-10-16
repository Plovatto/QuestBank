<template>
    <v-container class="mt-10">
        <Nav />
        <v-card elevation="0">
            <v-card-title class="text-blue font-weight-bold text-center text-h5">Editar Tópico</v-card-title>
            <br><br>
            <v-card-text>
                <v-form ref="form" @submit="editarTopico">

                    <v-textarea label="Enunciado" v-model="enunciado" outlined rows="4"></v-textarea>
                </v-form>
            </v-card-text>
            <v-card-actions class="d-flex justify-center align-itens-center">
                <v-btn height="50" width="240" class="bg-blue rounded-pill text-h6" @click="editarTopico">Salvar
                    edição</v-btn>
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
            id_topico: null,

            enunciado: '',
        };
    },
    async mounted() {
        this.id_topico = this.$route.params.id;
        await this.carregarDadosDoTopico();
    },
    methods: {
        async carregarDadosDoTopico() {
            try {
                const response = await axios.get(`https://api-quest-bank.vercel.app/topico/listar/${this.id_topico}`);
                if (response.data.status === 'success') {
                    const topico = response.data.topico;

                    this.enunciado = topico.enunciado;
                } else {
                    console.error('Erro ao carregar dados do tópico:', response.data.msg);
                }
            } catch (error) {
                console.error('Erro ao carregar dados do tópico:', error);
            }
        },
        async editarTopico() {
            try {
                const dadosEditados = {

                    enunciado: this.enunciado,
                };
                const response = await axios.put(`https://api-quest-bank.vercel.app/topico/atualizar/${this.id_topico}`, dadosEditados);
                if (response.data.status === 'success') {
                    console.log('Tópico editado com sucesso');
                    this.$router.push('/telaConfimEdit');
                } else {
                    console.error('Erro ao editar tópico:', response.data.msg);
                    this.$router.push('/telaErro');
                }
            } catch (error) {
                console.error('Erro ao editar tópico:', error);
            }
        },
    },
};
</script>
  