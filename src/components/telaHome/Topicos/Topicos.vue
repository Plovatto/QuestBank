<template>

  <v-slide-group 
  width="100%"
    v-model="model"
    show-arrows>

    <v-slide-group-item>
         
      <topico1 class="topico1" @mouseover="hover = true" @mouseleave="hover = false"/>
      <topico1 class="topico1" @mouseover="hover = true" @mouseleave="hover = false"/>
      <topico1 class="topico1" @mouseover="hover = true" @mouseleave="hover = false"/>
      <topico1 class="topico1" @mouseover="hover = true" @mouseleave="hover = false"/>
      <topico1 class="topico1" @mouseover="hover = true" @mouseleave="hover = false"/>
      <topico1 class="topico1" @mouseover="hover = true" @mouseleave="hover = false"/>
      <topico1 class="topico1" @mouseover="hover = true" @mouseleave="hover = false"/>
      <topico1 class="topico1" @mouseover="hover = true" @mouseleave="hover = false"/>
      <topico1 class="topico1" @mouseover="hover = true" @mouseleave="hover = false"/>
      <topico1 class="topico1" @mouseover="hover = true" @mouseleave="hover = false"/>
        

        </v-slide-group-item>

      </v-slide-group>
<br>
<br>
  </template>
<script> 
import topico1 from './topico1.vue';
export default {
   
    components:{
topico1
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
.bg-white{
    border:solid 1px  black;
    border-radius: 10px;
}
</style>
<style>
.topico1 {
  
  transition: transform 0.3s; 
}

.topico1:hover {
  transform: scale(1.06);
}
</style>