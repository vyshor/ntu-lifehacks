import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'fa4',
  theme: {
    primary: '#D81B60',
    secondary: '#880E4F',

    success: '#3cd1c2',
    info: '#ffaa2c',
    error: '#f83e70'
  }
})
