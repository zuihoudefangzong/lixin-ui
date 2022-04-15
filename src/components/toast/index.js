import LiToast from './toast.vue'

LiToast.install = function(Vue){
  // vue实例挂了一个function
  Vue.prototype.$toast = function (message) {
    // 构造1个vue组件
    const FeatureConstructor = Vue.extend(LiToast);
    // 实例化
    const toast = new FeatureConstructor({
      propsData:{
        closeButton: {
          text: '知道了',
          // callback: that=> {
          //   console.log(that)
          //   console.log('用户传了回调')
          // }
        }
      }
    })
    // 内部插槽可以放任何html或者vue组件
    // 可以去看container组件isVertical()
    toast.$slots.default = [message]
    // Vue将toast组件挂载mount到browser内存中
    toast.$mount()
    // 最后才插入该dom
    document.body.appendChild(toast.$el)
  };
  // 全局注册组件li-toast
  // Vue.component(LiToast.name, LiToast)
}

export default LiToast