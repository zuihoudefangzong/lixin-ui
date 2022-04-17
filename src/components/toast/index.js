import LiToast from './toast.vue'

// 简单重构
// 要构造vue组件 必要vue构造函数传过来 
function createToast ({Vue, propsData}) {
  // 构造1个vue组件
  const FeatureConstructor = Vue.extend(LiToast);
  // 实例化
  const toast = new FeatureConstructor({propsData})
  // 内部插槽可以放任何html或者vue组件
  // 可以去看container组件isVertical()
  // toast.$slots.default = [message]
  // Vue将toast组件挂载mount到browser内存中
  toast.$mount()
  // 最后才插入该dom
  // toast.$on('close',onClick)
  document.body.appendChild(toast.$el)
  return toast
}

// 页面只能有一个toast
let currentToast

// Vue是在 Vue.use的时候传进来的 options也是
LiToast.install = function(Vue, options){
  // 全局注册组件li-toast
  Vue.component(LiToast.name, LiToast)
  // vue实例挂了一个function 可传string或者对象
  Vue.prototype.$toast = function (toastOptions) {
    console.log(toastOptions)
    // 不考虑服务器渲染SSR
    // if (Vue.prototype.$isServer) return;
    toastOptions = toastOptions || {}
    // 假如传进来是string 就是只传message
    if(typeof toastOptions === 'string') {
      toastOptions = {
        message: toastOptions
      }
    }
    // 假如已经有toast了 调用里面方法 销毁组件
    if(currentToast) {
      currentToast.close()
      currentToast = null
    }
    // 复杂逻辑抽离成1个function
    currentToast = createToast({
      Vue,
      propsData: toastOptions,
      // onClose: () => {
      //   currentToast = null
      // }
    })
  };
}

export default LiToast