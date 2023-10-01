<template>
  <div
    class="carousel-container"
    @mouseenter="showButtons = true"
    @mouseleave="showButtons = false"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <div class="carousel-wrapper" ref="carousel">
      <div class="carousel">
        <v-card
          v-for="(card, cardIndex) in visibleCards"
          :key="cardIndex"
          class="card"
          @mouseover="showButton = true" 
          @mouseleave="showButton = false"
          elevation="0" 
        >
          <div class="bg-custom bg-white ma-3 elevation-3 rounded-xl card-content">
            <v-card-title class="text-left">
    <span class="font-weight-bold text-subtitle-2">{{ card.disciplina ? card.disciplina.nome_disciplina : 'N/A' }}</span>
            </v-card-title>
            <v-card-text class="text-caption text-left">
              <span class="font-weight-bold">Tópico:</span> {{ card.enunciado }} <br>
              <span class="font-weight-bold">Criado por:</span> {{ card.usuario.nome_pessoa }} <br>
            </v-card-text>
            <v-card-actions class="text-center">
              <v-btn class="bg-blue" elevation="2" rounded="xl" width="500" height="40"
                @click="verDetalhes(card)">Ver</v-btn>

            </v-card-actions>
          </div>
        </v-card>
      </div>
    </div>
    <button class="carousel-button prev" @click="prevSlide" v-if="showButtons">
      <v-icon color="white" icon="mdi-chevron-left"></v-icon>
    </button>
    <button class="carousel-button next" @click="nextSlide" v-if="showButtons">
      <v-icon color="white" icon="mdi-chevron-right"></v-icon>
    </button>
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
      hoveredCardIndex: null,
      currentIndex: 0,
      itemsPerPage: 6,
      showButton: false,
      showButtons: window.innerWidth <= 768,
      touchStartX: 0,
      touchEndX: 0,
    };
  },
  computed: {
    numberOfSlides() {
      return Math.ceil(this.cards.length / this.itemsPerPage);
    },
    visibleCards() {
      const start = this.currentIndex * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.cards.slice(start, end);
    },
  },
  mounted() {
    this.fetchCards();
    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScreenSize);
  },
  methods: {
    async fetchCards() {
      try {
        const response = await axios.get("http://localhost:3000/topico/listar");
        if (response.data.status === "success") {
          this.cards = response.data.topicos;
        } else {
          console.error("Error fetching cards:", response.data.msg);
        }
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    },

    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    },

    nextSlide() {
      if (this.currentIndex < this.numberOfSlides - 1) {
        this.currentIndex++;
      }
    },
    verDetalhes(topico) {
      this.$router.push({ name: 'TopicosDetalhes', params: { id: topico.id_topico } });
    },
    checkScreenSize() {
      this.showButtons = window.innerWidth <= 768;
      this.itemsPerPage = this.showButtons ? 1 : 6;
    },

    onTouchStart(event) {
      this.touchStartX = event.touches[0].clientX;
    },

    onTouchMove(event) {
      this.touchEndX = event.touches[0].clientX;
    },

    onTouchEnd() {
      const touchThreshold = 50; 

      if (this.touchStartX - this.touchEndX > touchThreshold) {
      
        this.nextSlide();
      } else if (this.touchEndX - this.touchStartX > touchThreshold) {
       
        this.prevSlide();
      }
    },
  },
};
</script>

<style>
.carousel-container {
  position: relative;
  overflow: hidden;
  width: 100%;
}

.carousel-wrapper {
  display: flex;
  align-items: center;
    justify-content: center;
  transition: transform 0.5s ease-in-out;
}

.carousel {
  display: flex;
  flex-direction: row;
}

.carousel-item {
  flex: 0 0 100%; 
  padding: 20px;
  box-sizing: border-box;
  background-color: #f0f0f0;
  border-radius: 8px;
  margin-right: 20px; 
}



.carousel-container:hover .carousel-button {
  display: block; 
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}
.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: #008cff;
  color: white;
  padding: 10px 12px;
  border: none;
  border-radius: 60%;
  cursor: pointer;
  z-index: 2;
}

@media (max-width: 768px) {
  .carousel-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .bg-custom {
    width: 16rem;
  }
}
</style>