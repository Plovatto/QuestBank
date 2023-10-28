<template>
  <div class="carousel-container mt-3">
    <v-slide-group width="100%" v-model="model" show-arrows>
      <v-slide-group-item v-for="(card, cardIndex) in cards" :key="cardIndex">
        <v-card elevation="0" :class="{ hovered: hoveredCardIndex === cardIndex }"
          @mouseover="hoveredCardIndex = cardIndex" @mouseleave="hoveredCardIndex = null">
          <div class="bg-white ma-3 elevation-3 rounded-xl text-center card-content">
            <v-card-title class="text-left">
              <span class="font-weight-bold text-subtitle-2">{{ card.disciplina ? card.disciplina.nome_disciplina : 'N/A'
              }}</span>
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
      itemsPerPage: 6,

    };
  },
  computed: {
    numberOfSlides() {
      return Math.ceil(this.provas.length / this.currentCardsPerPage);
    },
    currentCardsPerPage() {
      return 6;
    }
  },
  mounted() {
    this.fetchCards();

  },

  methods: {
    async fetchCards() {
      try {
        const userId = localStorage.getItem('userId');
        const response = await axios.get(`https://api-quest-bank.vercel.app/topico/listar/?idProfessor=${userId}`);
        if (response.data.status === "success") {
          this.cards = response.data.topicos;
        } else {
          console.error("Error fetching cards:", response.data.msg);
        }
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    },


    verDetalhes(topico) {
      this.$router.push({ name: 'TopicosDetalhes', params: { id: topico.id_topico } });
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