import { createApp } from 'vue'
import App from './App.vue'

import 'bulma/css/bulma.css'
import "vue-prism-editor/dist/prismeditor.min.css";
import "prismjs/themes/prism-tomorrow.css";
import VueSidePanel from 'vue3-side-panel';
createApp(App).use(VueSidePanel).mount('#app')
