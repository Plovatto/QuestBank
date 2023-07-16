<template>

  <v-slide-group 
  width="100%"
    v-model="model"
    show-arrows>

    <v-slide-group-item>
      
      <questao1 class="questao1" @mouseover="hover = true" @mouseleave="hover = false"/>        
      <questao1 class="questao1" @mouseover="hover = true" @mouseleave="hover = false"/>
      <questao1 class="questao1" @mouseover="hover = true" @mouseleave="hover = false"/>
      <questao1 class="questao1" @mouseover="hover = true" @mouseleave="hover = false"/>
      <questao1 class="questao1" @mouseover="hover = true" @mouseleave="hover = false"/>
      <questao1 class="questao1" @mouseover="hover = true" @mouseleave="hover = false"/>
      <questao1 class="questao1" @mouseover="hover = true" @mouseleave="hover = false"/>
      <questao1 class="questao1" @mouseover="hover = true" @mouseleave="hover = false"/>
      <questao1 class="questao1" @mouseover="hover = true" @mouseleave="hover = false"/>
      <questao1 class="questao1" @mouseover="hover = true" @mouseleave="hover = false"/>
      <questao1 class="questao1" @mouseover="hover = true" @mouseleave="hover = false"/>
      <questao1 class="questao1" @mouseover="hover = true" @mouseleave="hover = false"/>
        
    </v-slide-group-item>

      </v-slide-group>

  </template>
<script> 
import questao1 from './questao1.vue';
export default {
   
    components:{
questao1
    },
  data () {
    return {
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],hover: false,
    }
  },
}
</script>
<style>
.questao1 {
  
  transition: transform 0.3s; 
}

.questao1:hover {
  transform: scale(1.06);
}
</style>
