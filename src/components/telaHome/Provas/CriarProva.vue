<template><v-container><v-container>
    <Nav/>
    <br><br>
      <v-card elevation="0">
        
        <v-card-title class="text-blue font-weight-bold text-center text-h5">Adicionar Avaliação

        </v-card-title>
        <br><br>
        <v-card-text>
          <v-form ref="form">
            <label>Titulo da Avaliação</label>
            
            <v-text-field
            class="mt-3"
            placeholder="Exemplo:   Avaliação 1 "
            variant="solo"
            rows="2"
            row-height="20">
            </v-text-field>
            <label>Tipo</label>
          <v-select
          placeholder="Exemplo:   Objetiva"
          :items="['']"
           variant="solo"
           class="mt-3"
           ></v-select>
            <label>Tópico</label>
            <v-textarea
            class="mt-3"
            placeholder="Exemplo:   Operações matemáticas básicas"
            rows="2"
            variant="solo"
            row-height="20">
            </v-textarea>
            <label>Questão</label>
            <v-textarea
            rows="2"
            row-height="20"
            class="mt-3"
            variant="solo"
            placeholder="Exemplo:   Numa classe, há 15 meninos e 13 meninas. Quantas crianças há ao todo? "
            ></v-textarea>
            
            <label>Descrição</label>
            <v-textarea
            class="mt-3"
            variant="solo"
            placeholder="Exemplo:   Prova de matemática do primeiro trimestre. "
            ></v-textarea>
            
    
        
    

          </v-form>
        </v-card-text>
        <v-card-actions  class="d-flex justify-center align-itens-center">
           
          <v-btn :height="50" :width="240" class="bg-blue rounded-pill text-h6" @click="saveAlternativas">Salvar</v-btn>
        </v-card-actions>
      </v-card></v-container></v-container>
    </template>
    
    <script>
  
    import Nav from '@/components/Nav.vue';
    export default{
  components:{
  Nav,
  },
  
       
    };
    </script>
    

    