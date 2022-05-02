import Vue from 'vue'
import App from './App.vue'
import Button from './components/button/button.vue'
import ButtonGroup from './components/button/button-group.vue'
// import input from './components/input.vue'
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
// tabs标签页组件
import LiTabs from './components/tabs/'
// popover
import Popover from './components/popover/'
// collapse折叠面板
import Collapse from './components/collapse/'
// cascader级联选择器
import Cascader from './components/cascader/'
// carousel轮播图组件
import Carousel from './components/carousel/'

// 声明全局组件
Vue.component('li-button', Button)
Vue.component('li-button-group', ButtonGroup)
// Vue.component('li-input', input)
// gril栅格
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
// tabs标签页组件插件使用
Vue.use(LiTabs)
// popover组件插件使用
Vue.use(Popover)
// collapse折叠面板组件插件使用
Vue.use(Collapse)
// cascader级联选择器组件插件使用
Vue.use(Cascader)
// carousel轮播图组件插件使用
Vue.use(Carousel)


Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
