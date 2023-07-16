import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

// No need to set Vue.config.productionTip in Vue 3

const app = createApp(App);

// Use the 'use' method to add plugins or global components
app.use(router);
app.use(vuetify);

// Mount the app to the element with the ID 'app'
app.mount('#app');
