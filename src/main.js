import App from './App.vue'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import VuePapaParse from 'vue-papa-parse'

import 'tailwindcss/tailwind.css'

Vue.use(VuePapaParse)
Vue.use(VueClipboard)

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App),
}).$mount('#app')
