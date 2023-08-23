<template>
  <br><br>
  <v-container class="mt-8" >
    <v-container>
  
<Nav/>
    <v-card elevation="0">
      <v-card-title  class="text-blue font-weight-bold text-center text-h5">Adicionar Tópico</v-card-title>
      <br><br>
      <v-card-text>
        <label >Disciplina</label>
        <v-form ref="form" @submit="criarTopico">
          <v-text-field 
          placeholder="Exemplo:   Matemática"
          class="mt-3"  
          variant="solo"
          v-model="nomeDisciplina" 
          >
        </v-text-field>
          <label >Enunciado</label>
          <v-textarea  
          placeholder="Exemplo:   Operações matemáticas básicas"
          class="mt-3"        
          rows="2"
          row-height="20" 
          variant="solo"
          v-model="enunciado">
          </v-textarea>
          
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-center align-itens-center">
       
        <v-btn :height="50" :width="240" class="bg-blue rounded-pill text-h6"  @click="topico">Salvar</v-btn>
      </v-card-actions>
    </v-card></v-container></v-container>
  </template>
  
  <script>
  import { defineComponent, ref } from 'vue';
  import axios from 'axios';
  import { useRouter,useRoute  } from 'vue-router';
  import Nav from '@/components/Nav.vue';
  export default defineComponent({
components:{
Nav,
},

    setup() {
      
      const route = useRoute();
      const router = useRouter();
  
      const enunciado = ref('');
      const nomeDisciplina = ref('');
      const professorId = localStorage.getItem('userId');
      
      const criarTopico = async () => {
        const formData = {
          enunciado: enunciado.value,
          nome_disciplina: nomeDisciplina.value,
          professorId: professorId,
         
        };

  

        try {
          const response = await axios.post('https://api-questbank.onrender.com/criarTopico', formData);
          console.log('Tópico criado:', response.data);
         
        } catch (error) {
          console.error('Erro ao criar tópico:', error);
         
        }
      };
  
    const topico = () => {
      if (route.path !== '/telaConfim') {
  
        criarTopico();
        router.push('/telaConfim');
      }}
      
      return {
        enunciado,
        nomeDisciplina,
        criarTopico,
        topico
      };
    },
    });
  </script>