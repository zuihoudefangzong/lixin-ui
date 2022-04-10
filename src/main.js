import Vue from 'vue'
import App from './App.vue'
import Button from './components/button/button.vue'
import ButtonGroup from './components/button/button-group.vue'

// 声明全局组件
Vue.component('g-button', Button)
Vue.component('g-button-group', ButtonGroup)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
