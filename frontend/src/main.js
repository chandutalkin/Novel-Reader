import { createApp } from 'vue'
import App from './App.vue'
import router from './routes'
import WaveUI from 'wave-ui'
import { createMetaManager, plugin as vueMetaPlugin  } from 'vue-meta'

import 'wave-ui/dist/wave-ui.css'

const app = createApp(App);

new WaveUI(app, {
    colors: {
        primary: '#202121',
        secondary: '#49c5b6'
      }
    // Some Wave UI options.
  })
const metaManager = createMetaManager()
window.metaManager =  metaManager;
//router initiated
app.use(router).use(metaManager).use(vueMetaPlugin, {
  refreshOnceOnNavigation: false
});

app.mount('#app');
