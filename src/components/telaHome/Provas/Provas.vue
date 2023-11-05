<template>
  <div class="carousel-container mt-3">
    <v-slide-group width="100%" v-model="model" show-arrows>
      <v-slide-group-item>
        <v-card elevation="0" v-for="(prova, index) in provas" :key="index" class="card"
          :class="{ 'hovered': hover && hoveredCardIndex === index }" @mouseover="hover = true; hoveredCardIndex = index"
          @mouseleave="hover = false; hoveredCardIndex = null">

          <div class="bg-white ma-3 elevation-3 rounded-xl text-start card-content">
            <div class="card-text-content">
              <v-card-title class="text-start ">
                <span class="font-weight-bold text-subtitle-2">{{ prova.enunciado }}</span>
              </v-card-title>
              <v-card-text class="text-caption">
                <span class="font-weight-bold">Tipo:</span> {{ prova.tipo }}<br>
                <span class="font-weight-bold">Descrição:</span> {{ prova.descricao }} <br />
                <span class="font-weight-bold">Criado por:</span>

                {{ prova.criado_por.professor_nome }} <br />
              </v-card-text>
            </div>
            <div class="card-button-content">
              <v-card-actions class="text-center">
                <v-btn class="bg-blue" elevation="2" rounded="xl" width="500" height="40"
                  @click="verDetalhes(prova)">Ver</v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </v-slide-group-item>
    </v-slide-group>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    selectedOption3: String,
  },
  data() {
    return {
      model: 0,
      provas: [],
      hover: false,
      hoveredCardIndex: null
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
    this.fetchProvas();
    this.startAutoSlide();
  }, watch: {
    selectedOption3() {
      this.fetchProvas();
    },
  },
  methods: {
    verDetalhes(prova) {
      this.$router.push({ name: 'ProvasDetalhes', params: { id: prova.id_prova } });
    },
    startAutoSlide() {
      setInterval(() => {
        this.model = (this.model + 1) % this.numberOfSlides;
      }, 5000);
    },
    async fetchProvas() {
      try {
        if (this.selectedOption3 === "userId") {
          const userId = localStorage.getItem('userId');
          const response = await axios.get(`https://api-quest-bank.vercel.app/prova/listar/?idProfessor=${userId}`);
          if (response.data.status === "success") {
            this.provas = response.data.provas;
          } else {
            console.error("Error", response.data.msg);
          }
        } else if (this.selectedOption3 === "todos") {
          const response = await axios.get("https://api-questbankv2.onrender.com/provas/listar");
          console.log('API Response:', response);
          if (response.data.status === "success") {
            this.provas = response.data.provas;
          } else {
            console.error("Error", response.data.msg);
          }
        }
      } catch (error) {
        console.error("Error", error);
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
