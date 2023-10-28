<template>
  <v-app>
    <v-app-bar flat>
      <img height="30" src="@/assets/logo.svg" class="ml-8">
      <v-app-bar-title class="text-blue text-h5 font-weight-bold">
        Quest Bank
      </v-app-bar-title>
    </v-app-bar>

    <v-main>
      <v-container>
        <v-row align="center">
          <v-col cols="auto">
            <h3 class="ml-5 text-black text-h6 font-weight-bold">Minhas Avaliações</h3>
          </v-col>
          <v-col cols="3" sm="auto" lg="3" class="d-flex justify-end"></v-col>
          <v-col cols="auto" class="d-flex justify-end">
            <addProvas />
          </v-col>
          <v-col cols="12" sm="6" md="6" class="d-flex justify-end">
            <v-card-text>
              <v-text-field class="text-capitalize" :loading="loading" width="500" elevation="2" density="compact"
                variant="outlined" label="Pesquisar" append-inner-icon="mdi-magnify" single-line hide-details rounded="lg"
                v-model="searchTerm" @input="onSearchInput"></v-text-field>
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
      <v-row v-if="searchResults.length === 0 && showError && searchTerm.length !== 0">
        <v-col class="text-center">
          <p class="bg-blue">Nenhum resultado encontrado para Provas.</p>
        </v-col>
      </v-row>

      <v-row v-if="searchTerm.length === 0" class="carousel-container">
        <Provas />
      </v-row>

      <v-container fluid class="marg">
        <v-row>
          <v-col v-for="(result, index) in searchResults" :key="index" cols="12" sm="6" md="4" lg="2" class="my-2">
            <ResultadoPesquisa :result="result" :hovered="hoveredCardIndex === index" @verDetalhes="verDetalhes" />
          </v-col>
        </v-row>
      </v-container>

<br>




      <v-container>
        <v-row align="center">
          <v-col cols="auto">
            <h3 class="ml-5 text-black text-h6 font-weight-bold">Minhas Questões</h3>
          </v-col>
          <v-col cols="3" sm="auto" lg="3" class="d-flex justify-end"></v-col>
          <v-col cols="auto" class="d-flex justify-end">
            <addQuestao />
          </v-col>
          <v-col cols="12" sm="6" md="6" class="d-flex justify-end">
            <v-card-text>
              <v-text-field class="text-capitalize" :loading="loading2" width="500" elevation="2" density="compact"
                variant="outlined" label="Pesquisar" append-inner-icon="mdi-magnify" single-line hide-details rounded="lg"
                v-model="searchTerm2" @input="onSearchInput2"></v-text-field>
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
      <v-row v-if="searchResults2.length === 0 && showError2 && searchTerm2.length !== 0">
        <v-col class="text-center">
          <p class="bg-blue">Nenhum resultado encontrado para Questões.</p>
        </v-col>
      </v-row>

      <v-row v-if="searchTerm2.length === 0" class="carousel-container">
        <Questoes />
      </v-row>

      <v-container fluid class="marg">
        <v-row>
          <v-col v-for="(result2, index) in searchResults2" :key="index" cols="12" sm="6" md="4" lg="2" class="my-2">
            <ResultadoPesquisa2 :result2="result2" :hovered="hoveredCardIndex2 === index" @verDetalhes="verDetalhes2" />
          </v-col>
        </v-row>
      </v-container>


      <br>


      <v-container>
        <v-row align="center">
          <v-col cols="auto">
            <h3 class="ml-5 text-black text-h6 font-weight-bold">Meus Tópicos</h3>
          </v-col>
          <v-col cols="3" sm="auto" lg="3" class="d-flex justify-end"></v-col>
          <v-col cols="auto" class="d-flex justify-end">
            <addTopico />
          </v-col>
          <v-col cols="12" sm="6" md="6" class="d-flex justify-end">
            <v-card-text>
              <v-text-field class="text-capitalize" :loading="loading3" width="500" elevation="2" density="compact"
                variant="outlined" label="Pesquisar" append-inner-icon="mdi-magnify" single-line hide-details rounded="lg"
                v-model="searchTerm3" @input="onSearchInput3"></v-text-field>
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
      <v-row v-if="searchResults3 && searchResults3.length === 0 && showError3 && searchTerm3.length !== 0">
        <v-col class="text-center">
          <p class="bg-blue">Nenhum resultado encontrado para Tópicos.</p>
        </v-col>
      </v-row>


      <v-row v-if="searchTerm3.length === 0" class="carousel-container">
        <Topicos />
      </v-row>

      <v-container fluid class="marg">
        <v-row>
          <v-col v-for="(result3, index) in searchResults3" :key="index" cols="12" sm="6" md="4" lg="2" class="my-2">
            <ResultadoPesquisa3 :result3="result3" :hovered3="hoveredCardIndex3 === index" @verDetalhes="verDetalhes3" />
          </v-col>
        </v-row>
      </v-container>





      <br><br>




<navBar/>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios';
import addProvas from '@/components/telaHome/Provas/addProvas.vue';
import Provas from '@/components/telaHome/Provas/Provas.vue';
import addQuestao from '@/components/telaHome/Questoes/addQuestao.vue';
import Questoes from '@/components/telaHome/Questoes/Questoes.vue';
import Topicos from '@/components/telaHome/Topicos/Topicos.vue';
import addTopico from '@/components/telaHome/Topicos/addTopico.vue';
import ResultadoPesquisa from '@/components/telaHome/Provas/ResultadoPesquisa.vue';
import ResultadoPesquisa2 from '@/components/telaHome/Questoes/ResultadoPesquisa2.vue';
import ResultadoPesquisa3 from '@/components/telaHome/Topicos/ResultadoPesquisa3.vue';
import navBar from '@/components/navBar.vue';

import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  components: {
    addProvas,
    Provas,
    navBar,
    addQuestao,
    Questoes,
    Topicos,
    addTopico,
    ResultadoPesquisa,
    ResultadoPesquisa2,
    ResultadoPesquisa3,
  },
  data() {
    return {
      searchTerm: '',
      searchResults: [],
      loading: false,
      hoveredCardIndex: null,
      showError: false,

      searchTerm2: '',
      searchResults2: [],
      loading2: false,
      hoveredCardIndex2: null,
      showError2: false,

      searchTerm3: '',
      searchResults3: [],
      loading3: false,
      hoveredCardIndex3: null,
      showError3: false,
    };
  }, watch: {
    searchTerm(newValue) {
      if (newValue === '') {
        this.showProvas = true;
      }
    },

    searchTerm2(newValue2) {
      if (newValue2 === '') {
        this.showQuestoes = true;
      }
    },

    searchTerm3(newValue3) {
      if (newValue3 === '') {
        this.showTopicos = true;
      }
    },
  },
  methods: {
    async performSearch() {
      if (this.searchTerm !== '') {
        this.loading = true;
        try {
          const response = await axios.get(`https://api-quest-bank.vercel.app/prova/buscar/${this.searchTerm}`);

          if (response.data.status === 'success') {
            this.searchResults = response.data.provas;
          } else {
            console.error('Erro na pesquisa:', response.data.msg);
          }
        } catch (error) {
          console.error('Erro na pesquisa:', error);
        } finally {
          this.loading = false;
          this.showErrorMessageAfterDelay(4000);
        }
      } else {
        this.searchResults = [];
      }
    },


    async performSearch2() {
      if (this.searchTerm2 !== '') {
        this.loading2 = true;
        try {
          const response2 = await axios.get(`https://api-quest-bank.vercel.app/questao/buscar/${this.searchTerm2}`);

          if (response2.data.status === 'success') {
            this.searchResults2 = response2.data.questoes;
          } else {
            console.error('Erro na pesquisa:', response2.data.msg);
          }
        } catch (error) {
          console.error('Erro na pesquisa:', error);
        } finally {
          this.loading2 = false;
          this.showErrorMessageAfterDelay2(4000);
        }
      } else {
        this.searchResults2 = [];
      }
    },


    async performSearch3() {
      if (this.searchTerm3 !== '') {
        this.loading3 = true;
        try {
          const response3 = await axios.get(`https://api-quest-bank.vercel.app/topico/buscar/${this.searchTerm3}`);

          if (response3.data.status === 'success') {
            this.searchResults3 = response3.data.topico;
          } else {
            console.error('Erro na pesquisa:', response3.data.msg);
          }
        } catch (error) {
          console.error('Erro na pesquisa:', error);
        } finally {
          this.loading3 = false;
          this.showErrorMessageAfterDelay3(4000);
        }
      } else {
        this.searchResults3 = [];
      }
    },
    showErrorMessageAfterDelay3(delay3) {
      setTimeout(() => {
        this.showError3 = this.searchResults3 && this.searchResults3.length === 0;
      }, delay3);
    },
    onSearchInput3() {
      if (this.searchTerm3 === '') {
        this.showTopicos = true;
      }
      this.performSearch3();
    },
    showErrorMessageAfterDelay(delay) {
      setTimeout(() => {
        this.showError = this.searchResults.length === 0;
      }, delay);
    },


    showErrorMessageAfterDelay2(delay2) {
      setTimeout(() => {
        this.showError2 = this.searchResults2.length === 0;
      }, delay2);
    },

    onSearchInput() {
      if (this.searchTerm === '') {
        this.showProvas = true;
      }
      this.performSearch();
    },
    onSearchInput2() {
      if (this.searchTerm2 === '') {
        this.showQuestoes = true;
      }
      this.performSearch2();
    },
  }

});
</script>
