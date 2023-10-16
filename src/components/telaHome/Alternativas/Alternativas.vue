<template>
  <div class="carousel-container">
    <v-slide-group width="100%" v-model="model" show-arrows>
      <v-slide-group-item>
        <v-card elevation="0" v-for="(alternativa, index) in alternativas" :key="index" class="card"
          :class="{ 'hovered': hover && hoveredCardIndex === index }" @mouseover="hover = true; hoveredCardIndex = index"
          @mouseleave="hover = false; hoveredCardIndex = null">

          <div class="bg-white ma-3 elevation-3 rounded-xl text-center card-content">
            <v-card-title class="text-center">
              <span class="font-weight-bold text-subtitle-2">{{ alternativa.enunciado }}</span>
            </v-card-title>
            <v-card-text class="text-caption">
              <span class="font-weight-bold">Correta:</span> {{ alternativa.correta ? 'Sim' : 'Não' }}<br>
              <span class="font-weight-bold">Questão:</span> {{ alternativa.questao.enunciado }}<br>
              <span class="font-weight-bold">Tipo:</span> {{ alternativa.questao.tipo }}<br>
              <span class="font-weight-bold">Nível:</span> {{ alternativa.questao.nivel }}<br>
            </v-card-text>
            <v-card-actions class="text-center">
              <v-btn class="bg-blue" elevation="2" rounded="xl" width="500" height="40"
                @click="verDetalhes(alternativa)">Ver</v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      model: 0,
      hover: false,
      hoveredCardIndex: null,
      alternativas: []
    };
  },
  computed: {
    numberOfSlides() {
      return Math.ceil(this.alternativas.length / this.currentCardsPerPage);
    },
    currentCardsPerPage() {
      return 6;
    }
  },

  mounted() {
    this.fetchAlternativas();
    this.startAutoSlide();
  },
  methods: {
    verDetalhes(alternativa) {
      this.$router.push({ name: 'AlternativaDetalhes', params: { id: alternativa.id_alternativa } });
    },
    startAutoSlide() {
      setInterval(() => {
        this.model = (this.model + 1) % this.numberOfSlides;
      }, 5000);
    },

    async fetchAlternativas() {
      try {
        const response = await axios.get("https://api-quest-bank.vercel.app/alternativa/listar");
        if (response.data.status === 'success') {
          this.alternativas = response.data.alternativas;
        } else {
          console.error('Erro ao buscar alternativas', response.data.msg);
        }
      } catch (error) {
        console.error('Erro ao buscar alternativas', error);
      }
    }
  }
};
</script>

<style>
.carousel-container {
  width: 100%;
  overflow: hidden;
}

.card-content {
  height: 310px;
  width: 210px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.2s, box-shadow 0.2s;
  transform-origin: center;
}

.hovered {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
  transform: scale(1.05);
}
</style>
