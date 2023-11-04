<template>
  <v-container>
    <v-app-bar flat>
      <template v-slot:append>
        <v-icon @click="close" color="blue">mdi-close-circle</v-icon>
      </template>
    </v-app-bar>


        
         
          <redefinir />
      
  
  </v-container>
</template>

<script>
import Logo from '@/components/Logo.vue';
import redefinir from '@/components/telaRedefinir/redefinir.vue';
import { defineComponent } from 'vue'; 
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  components: {
    Logo,
    redefinir
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    const close = () => {
      if (route.path !== '/Login') {
        router.push('/Login');
      }
    };

    return {
      close,
    };
  },
});
</script>