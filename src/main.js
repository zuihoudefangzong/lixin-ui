import Vue from 'vue'
import App from './App.vue'
import Button from './components/button/button.vue'
import ButtonGroup from './components/button/button-group.vue'
import input from './components/input.vue'
import Row from './components/row/row.vue'
import Col from './components/col/col.vue'

// 声明全局组件
Vue.component('li-button', Button)
Vue.component('li-button-group', ButtonGroup)
Vue.component('li-input', input)
Vue.component('li-row', Row)
Vue.component('li-col', Col)


Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
