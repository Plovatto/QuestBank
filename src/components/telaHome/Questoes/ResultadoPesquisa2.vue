<template>
  <div class="bg-white elevation-3 rounded-xl text-center card-content" :class="{ hovered2 }">

    <v-card-text class="text-caption">
      <span class="font-weight-bold">Tópico</span> {{ result2.topico.topico_enunciado }}<br>
      <span class="font-weight-bold">Enunciado:</span> {{ result2.enunciado }}
      <span class="font-weight-bold">Tipo:</span> {{ result2.tipo }} <br />
      <span class="font-weight-bold">Nível:</span> {{ result2.nivel }}
      <br />
      <span class="font-weight-bold">Criado por:</span>
      {{ result2.professor.professor_nome }} <br />
    </v-card-text>
    <v-card-actions class="text-center">
      <v-btn class="bg-blue" elevation="2" rounded="xl" width="500" height="40" @click="verDetalhes(result2)">
        Ver
      </v-btn>
    </v-card-actions>
  </div>
</template>
  
<script>
export default {
  props: {
    result2: Object,
    hovered2: Boolean,
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