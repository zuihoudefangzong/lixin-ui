import Vue from 'vue'
import Button from './button/button'
import Icon from './icon'
import ButtonGroup from './button/button-group'
// 声明全局组件
Vue.component('g-button', Button)
Vue.component('g-icon', Icon)
Vue.component('g-button-group', ButtonGroup)

new Vue({
  el: '#app',
  data: {
    loading1: false,
    loading2: false,
    loading3: false,
  }
})

import chai from 'chai'
const expect = chai.expect
// 单元测试 chai
// {
//   // 返回1个构造函数
//   // console.dir(Button) //button导出就是1个对象
//   const Constructor = Vue.extend(Button)
//   const button = new Constructor({
//     propsData: {
//       icon: 'settings'
//     }
//   })
//   // 挂载到#test元素上面 通过js挂载div#test
//   button.$mount('#test')
//   // 找到use标签
//   let useElement = button.$el.querySelector('use')
//   // console.log(useElement)
//   // console.log(useElement.getAttribute('xlink:href'))
//   // expect(useElement.getAttribute('xlink:href')).to.eq('settings')
//   // 断言没有报错 就是过了单元测试了
//   expect(useElement.getAttribute('xlink:href')).to.eq('#i-settings')
// }

// 断言测试loading
// {
//   const Constructor = Vue.extend(Button)
//   const button = new Constructor({
//     propsData: {
//       icon: 'settings',
//       loading: true
//     }
//   })
//   button.$mount('#test')
//   let useElement = button.$el.querySelector('use')
//   let href = useElement.getAttribute('xlink:href')
//   expect(href).to.eq('#i-loading')
// }

// 断言单元测试 svg的order
{
  const div = document.createElement('div')
  document.body.appendChild(div)
  const Constructor = Vue.extend(Button)
  const button = new Constructor({
    propsData: {
      icon: 'settings',
      iconPosition: 'right'
    }
  })
  button.$mount(div)
  let svg = button.$el.querySelector('svg')
  let { order } = window.getComputedStyle(svg)
  expect(order).to.eq('2')
  // 测试完 把button元素删除
  button.$el.remove()
  // 把button对象删除
  button.$destroy()
}

// 断言触发button click事件
import chaSpies from 'chai-spies'
chai.use(chaSpies)
{
  const Constructor = Vue.extend(Button)
  const gButton = new Constructor({
    propsData: {
      icon: 'settings',
      iconPosition: 'right'
    }
  })
  gButton.$mount()
  let sqy = chai.spy(function(){})
  gButton.$on('click',sqy)
  let button = gButton.$el
  button.click()
  // 断言sqy被调用了
  expect(sqy).to.have.been.called()
}