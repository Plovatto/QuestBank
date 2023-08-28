<template>
  <div class="carousel-container">
    <v-slide-group width="100%" v-model="model" show-arrows>
      <v-slide-group-item>
        <v-card elevation="0" v-for="(card, cardIndex) in cards" :key="cardIndex" class="card"
          :class="{ 'hovered': hover && hoveredCardIndex === cardIndex }"
          @mouseover="hover = true; hoveredCardIndex = cardIndex" @mouseleave="hover = false; hoveredCardIndex = null">

          <div class="bg-white ma-3 elevation-3 rounded-xl card-content">
            <v-card-title class="text-left">
              <span class="font-weight-bold text-subtitle-2">{{ card.Disciplina.nome_disciplina }}</span>
            </v-card-title>
            <v-card-text class="text-caption text-left">
              <span class="font-weight-bold">Tópico:</span> {{ card.enunciado }} <br>
              <span class="font-weight-bold">Criado por:</span> {{ card.usuario.nome_pessoa }} <br>
            </v-card-text>
            <v-card-actions class="text-center">
              <v-btn class="bg-blue" elevation="2" rounded="xl" width="500" height="40">Ver</v-btn>
            </v-card-actions>
          </div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      model: 0,
      cards: [],
      hover: false,
      hoveredCardIndex: null
    };
  },
  computed: {
    numberOfSlides() {
      return Math.ceil(this.cards.length / this.currentCardsPerPage);
    },
    currentCardsPerPage() {
      return 6;
    }
  },
  mounted() {
    this.fetchCards();
    this.startAutoSlide();
  },
  methods: {
    startAutoSlide() {
      setInterval(() => {
        this.model = (this.model + 1) % this.numberOfSlides;
      }, 5000);
    },
    async fetchCards() {
      try {
        const response = await axios.get("https://api-questbank.onrender.com/listarTopico");
        if (response.data.status === "success") {
          this.cards = response.data.topicos;
        } else {
          console.error("Error fetching cards:", response.data.msg);
        }
      } catch (error) {
        console.error("Error fetching cards:", error);
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
