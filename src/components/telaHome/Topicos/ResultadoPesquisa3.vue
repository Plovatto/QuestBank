<template>
  <div class="bg-white elevation-3 rounded-xl text-center card-content" :class="{ hovered3 }">

    <v-card-title class="text-left">
      <span class="font-weight-bold text-subtitle-2">{{ result3.disciplina ? result3.disciplina.nome_disciplina : 'N/A'
      }}</span>
    </v-card-title>
    <v-card-text class="text-caption text-left">
      <span class="font-weight-bold">Tópico:</span> {{ result3.enunciado }} <br>
      <span class="font-weight-bold">Criado por:</span> {{ result3.usuario.nome_pessoa }} <br>
    </v-card-text>
    <v-card-actions class="text-center">
      <v-btn class="bg-blue" elevation="2" rounded="xl" width="500" height="40" @click="verDetalhes(result3)">
        Ver
      </v-btn>
    </v-card-actions>
  </div>
</template>
  
<script>
export default {
  props: {
    result3: Object,
    hovered3: Boolean,
  },
  methods: {
    verDetalhes(prova) {
      if (prova && prova.id_prova) {
        this.$router.push({ name: 'ProvasDetalhes', params: { id: prova.id_prova } });
      }
    },
  },
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