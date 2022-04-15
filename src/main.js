import Vue from 'vue'
import App from './App.vue'
import Button from './components/button/button.vue'
import ButtonGroup from './components/button/button-group.vue'
import input from './components/input.vue'
import Row from './components/row/row.vue'
import Col from './components/col/col.vue'
// layout
import  Container  from './components/container/container.vue'
import Aside from './components/container/aside.vue'
import Header from './components/container/header.vue'
import Footer from './components/container/footer.vue'
import Main from './components/container/main.vue'
// toast通知组件
import Toast from './components/toast/'

// 声明全局组件
Vue.component('li-button', Button)
Vue.component('li-button-group', ButtonGroup)
Vue.component('li-input', input)
Vue.component('li-row', Row)
Vue.component('li-col', Col)
// layout
Vue.component('li-container', Container)
Vue.component('li-aside', Aside)
Vue.component('li-header', Header)
Vue.component('li-footer', Footer)
Vue.component('li-main', Main)
// toast通知组件
Vue.use(Toast)


Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
