<template>
  <v-container class="mt-15">
    <Nav />
    <v-card elevation="0">
      <v-card-title class="text-blue font-weight-bold text-center text-h5">Editar Alternativa</v-card-title>
      <v-card-text>
        <v-form ref="form" @submit="editarAlternativa">
          <v-textarea label="Enunciado da Alternativa" v-model="enunciado" outlined rows="4"></v-textarea>
          <v-checkbox v-model="correta" label="Correta" class="pr-0"></v-checkbox>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-center align-items-center">
        <v-btn @click="editarAlternativa" height="50" width="240" class="bg-blue rounded-pill text-h6">Salvar
          Edição</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog" max-width="500" >
        <v-card>
            <br>
            
          <v-card-title style="font-size: 20px;" class="font-weight-bold text-blue ml-2 mr-4">Editada com sucesso!<v-icon class="ml-2" color="info" icon="mdi-check-circle" size="small"></v-icon></v-card-title>
          <v-card-text  class="text-blue">A alternativa foi editada com sucesso.</v-card-text>
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
      id_alternativa: null,
      enunciado: '',
      correta: false,
      dialog: false,
        dialogTitle: '',
        dialogMessage: '',
    };
  },
  async mounted() {
    this.id_alternativa = this.$route.params.id;
    await this.carregarDetalhesAlternativa();
  },
  methods: {
    async carregarDetalhesAlternativa() {
      try {
        const response = await axios.get(`https://api-quest-bank.vercel.app/alternativa/listar/${this.id_alternativa}`);
        if (response.data.status === 'success') {
          const alternativa = response.data.alternativa;
          this.enunciado = alternativa.enunciado;
          this.correta = alternativa.correta === true;
        } else {
          console.error('Erro ao carregar detalhes da alternativa:', response.data.msg);
        }
      } catch (error) {
        console.error('Erro ao carregar detalhes da alternativa:', error);
      }
    },redirectToDetails() {
  console.log('Redirecionando para a tela anterior');
  this.$router.go(-1);
},
    async editarAlternativa() {
  try {
    const dadosEditados = {
      enunciado: this.enunciado,
      correta: this.correta ? "True" : "False",
    };

    console.log('Tentando editar a alternativa com o ID:', this.id_alternativa);
    const response = await axios.put(`https://api-quest-bank.vercel.app/alternativa/atualizar/${this.id_alternativa}`, dadosEditados);
    if (response.data.status === 'success') {
      console.log('Alternativa editada com sucesso');
      this.dialog = true;
      setTimeout(() => {
        this.dialog = false; 
        this.redirectToDetails();
      }, 2000);
    } else {
      console.error('Erro ao editar a alternativa:', response.data.msg);
      this.$router.push('/telaErro');
    }
  } catch (error) {
    console.error('Erro ao editar a alternativa:', error);
  }
},}
};
</script>