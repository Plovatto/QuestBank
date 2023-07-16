<template>
  <v-slide-group 
      width="100%"
        v-model="model"
        show-arrows>


        <v-slide-group-item>
   
        <prova1 class="prova1" @mouseover="hover = true" @mouseleave="hover = false"/>
        <prova1 class="prova1" @mouseover="hover = true" @mouseleave="hover = false"/>
        <prova1 class="prova1" @mouseover="hover = true" @mouseleave="hover = false"/>
        <prova1 class="prova1" @mouseover="hover = true" @mouseleave="hover = false"/>
        <prova1 class="prova1" @mouseover="hover = true" @mouseleave="hover = false"/>
        <prova1 class="prova1" @mouseover="hover = true" @mouseleave="hover = false"/>
        <prova1 class="prova1" @mouseover="hover = true" @mouseleave="hover = false"/>
        <prova1 class="prova1" @mouseover="hover = true" @mouseleave="hover = false"/>
        <prova1 class="prova1" @mouseover="hover = true" @mouseleave="hover = false"/>
        <prova1 class="prova1" @mouseover="hover = true" @mouseleave="hover = false"/>
        <prova1 class="prova1" @mouseover="hover = true" @mouseleave="hover = false"/>
        <prova1 class="prova1" @mouseover="hover = true" @mouseleave="hover = false"/>
        <prova1 class="prova1" @mouseover="hover = true" @mouseleave="hover = false"/>
        
        </v-slide-group-item>

      </v-slide-group>

  </template>

<script> 
import prova1 from './prova1.vue';
export default {
components:{
prova1
    },
  data () {
    return {
      slides: [
        'First',
        'Second',
        'Third',
        'Fourth',
        'Fifth',
      ],  hover: false,
    }
  },
}
</script>
<style>
.prova1 {
  
  transition: transform 0.3s; 
}

.prova1:hover {
  transform: scale(1.06); 
}
</style>
