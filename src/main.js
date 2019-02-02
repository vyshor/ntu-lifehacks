import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import * as VueGoogleMaps from "vue2-google-maps"

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyANzkX8usvRMGp7TJSLFVaFtq-rCXSXfQ0",
    libraries: "places" // necessary for places input
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

