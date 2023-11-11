<template>
    <v-container class="mt-15">
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
                <v-btn @click="editarProva" height="50" width="240" class="bg-blue rounded-pill text-h6">Salvar
                    edição</v-btn>
            </v-card-actions>
        </v-card>
        <v-dialog v-model="dialog" max-width="500" >
        <v-card>
            <br>
            
          <v-card-title style="font-size: 20px;" class="font-weight-bold text-blue ml-2 mr-4">Editada com sucesso!<v-icon class="ml-2" color="info" icon="mdi-check-circle" size="small"></v-icon></v-card-title>
          <v-card-text  class="text-blue">A prova foi editada com sucesso.</v-card-text>
        <br><br>
        </v-card>
      </v-dialog>
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
            id_prova: '',
            enunciado: '',
            tipo: '',
            descricao: '',
            dialog: false,
        dialogTitle: '',
        dialogMessage: '',
        };
    },
    async mounted() {
        await this.carregarDetalhesProva();
        this.id_prova = this.$route.params.id;
    },
    methods: {
        async carregarDetalhesProva() {
            try {
                const response = await axios.get(`https://api-quest-bank.vercel.app/prova/listar/${this.$route.params.id}`);
                if (response.data.status === 'success') {
                    const prova = response.data.prova;
                    this.enunciado = prova.enunciado;
                    this.tipo = prova.tipo;
                    this.descricao = prova.descricao;
                } else {
                    console.error('Erro ao carregar detalhes da prova:', response.data.msg);
                }
            } catch (error) {
                console.error('Erro ao carregar detalhes da prova:', error);
            }
        },redirectToDetails() {
  console.log('Redirecionando para a tela anterior');
  this.$router.go(-1);
},
        async editarProva() {
            try {
                const dadosEditados = {
                    enunciado: this.enunciado,
                    tipo: this.tipo,
                    descricao: this.descricao,
                };
                console.log(dadosEditados);

                const response = await axios.put(`https://api-quest-bank.vercel.app/prova/atualizar/${this.id_prova}`, dadosEditados);
                if (response.data.status === 'success') {
                    console.log('Prova editada com sucesso');
                    this.dialog = true;
      setTimeout(() => {
        this.redirectToDetails();
      }, 2000);
                   
                } else {
                    console.error('Erro ao editar a prova:', response.data.msg);
                    this.$router.push('/telaErro');
                }
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    console.error('Prova não encontrada');
                    console.log(error);
                    this.$router.push('/telaErro');
                } else {
                    console.error('Erro ao editar a prova:', error);
                }
            }
        },redirectToDetails() {
  this.$router.push(`/provas-detalhes/${this.id_prova}`);
},
    },
};
</script>