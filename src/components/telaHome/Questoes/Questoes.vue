<template>
  <div class="carousel-container mt-3">
    <v-slide-group width="100%" v-model="model" show-arrows>
      <v-slide-group-item v-for="(card, cardIndex) in cards" :key="cardIndex">
        <v-card elevation="0" :class="{ hovered: hoveredCardIndex === cardIndex }"
          @mouseover="hoveredCardIndex = cardIndex" @mouseleave="hoveredCardIndex = null">
          <div class="bg-white ma-3 elevation-3 rounded-xl text-start card-content">
    <div class="card-text-content">
            <v-card-title class="text-center"> </v-card-title>
            <v-card-text class="text-caption text-left">
              <span class="font-weight-bold">Tópico:</span>
              {{ truncateText(card.topico.topico_enunciado),20 }} <br />
              <span class="font-weight-bold">Enunciado:</span>
              {{ truncateText(card.enunciado, 45) }} <br />
              <span class="font-weight-bold">Tipo:</span> {{ card.tipo }} <br />
              <span class="font-weight-bold">Nível:</span> {{ card.nivel }}
              <br />
              <span class="font-weight-bold">Criado por:</span>
              {{ card.professor.professor_nome }} <br />
            </v-card-text></div> <div class="card-button-content">
            <v-card-actions class="text-center">
              <v-btn class="bg-blue" elevation="2" rounded="xl" width="500" height="40"
                @click="verDetalhes(card)">Ver</v-btn>
            </v-card-actions></div>
          </div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: {
    selectedOption2: String, 
  },
  data() {
    return {
      model: 0,
      cards: [],
      hoveredCardIndex: null,
    };
  },
  computed: {
    numberOfSlides() {
      return Math.ceil(this.cards.length / this.currentCardsPerPage);
    },
    currentCardsPerPage() {
      return 6;
    },
  },
  mounted() {
    this.fetchCards();
    this.startAutoSlide();
  },  watch: {
    selectedOption2() {
      this.fetchCards();
    },
  },
  methods: { truncateText(text, maxLength) {
      if (text.length > maxLength) {
        return text.substring(0, maxLength) + '...';
      }
      return text;
    },
    verDetalhes(questao) {
      this.$router.push({
        name: "QuestaoDetalhes",
        params: { id: questao.id_questao },
      });
    },
    startAutoSlide() {
      setInterval(() => {
        this.model = (this.model + 1) % this.numberOfSlides;
      }, 5000);
    },
    async fetchCards() {
      try {
    if (this.selectedOption2 === "userId") {
      const userId = localStorage.getItem('userId');
      const response = await axios.get(`https://api-quest-bank.vercel.app/questao/listar/?idProfessor=${userId}`);
      if (response.data.status === "success") {
        this.cards = response.data.questoes;
      } else {
        console.error("Error", response.data.msg);
      }
    } else if (this.selectedOption2 === "todos") {
      const response = await axios.get("https://api-quest-bank.vercel.app/questoes/listar");
      console.log('API Response:', response); 
      if (response.data.status === "success") {
        this.cards = response.data.questoes;
      } else {
        console.error("Error", response.data.msg);
      }
    }
  } catch (error) {
    console.error("Error", error);
  }

}
  },
};
</script>

<style>
.carousel-container {
  width: 100%;
  overflow: hidden;
}

.card-text-content {
  overflow: auto; 
  flex-grow: 1; 

}

.hovered {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: 0.3s;
  transform: scale(1.05);
}
</style>
