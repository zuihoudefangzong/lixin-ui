<template>
  <transition @after-leave="handleAfterLeave">
    <!-- 一旦隐藏同时触发了transition离开时候钩子函数afterleave -->
    <!-- 鼠标移动到该div和 -->
    <div
      class="toast"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
      ref="toast"
      :class="toastClasses"
    >
      <!-- 由于message内容是通过slot形式从过来的 -->
      <slot v-if="message">
        <div v-if="!dangerouslyUseHTMLString">{{message}}</div>
        <div v-else v-html="message"></div>
      </slot>
      
      <div class="line" ref="line"></div>
      <span
        class="close"
        v-if="closeButton"
        @click="close"
      >
        {{closeButton.text}}
      </span>
    </div>   
  </transition>
</template>

<script>
export default {
  name: 'LiToast',
  props: {
    // 默认自动关闭
    // 事件为3000毫秒
    duration: {
      type: Number,
      default: 3000
    },
    // showClose是否显示关闭按钮
    // showClose: {
    //   type: Boolean,
    //   default: false
    // },
    // onClose关闭时的回调函数,参数为被关闭的toast实例
    // onClose: {
    //   type: Function,
    //   default: undefined
    // }
    // 显示关闭按钮和闭时的回调 换种方式结合也行
    closeButton: {
      type: Object,
      // 当default值为Object 要写成函数形式 不要用引用数据类型
      // 因为这是vue.component(name,'构造选项而已')
      default() {
        return {
          text: '关闭',
          callback: undefined
        }
      }
    },
    message: String,
    // 默认不支持渲染html形式
    dangerouslyUseHTMLString: false,
    // message消息提示的位置
    position: {
      type: String,
      default: 'top',
      validator (value) {
        return ['top', 'bottom', 'middle'].indexOf(value) >= 0
      }
    }
  },
  data(){
    return {
      // 默认toast显示
      visible: true,
      // 判断是否正在关闭了
      closed: false,
      // timer定时器的关闭id
      timer: null
    }
  },
  watch: {
    // 监听关闭状态
    closed(newVal) {
      // console.log(newVal)
      // 只有closed为true才隐藏
      // 一旦隐藏同时触发了
      // transition离开时候钩子函数afterleave
      if (newVal) {
        // v-show 隐藏起来
        this.visible = false
      }
    }
  },
  methods: {
    // 定时开始
    // 或者鼠标移开的时候setTimeout开始
    startTimer () {
      let { duration } = this
      // default 3000毫秒
      // 设置0为不会被自动关闭 就是不会添加定时器宏任务
      if (duration > 0) {
        this.timer = setTimeout( ()=> {
          // 先判断是否正在执行关闭
          if (!this.closed){
            this.close()
          }
        }, duration)
      }
    },

    // 鼠标移动到message的时候 clearTimeout
    clearTimer () {
      if(this.timer){
        clearTimeout(this.timer)
      }
    },
    
    // 关闭toast了
    close () {
      // 正在关闭了
      this.closed = true
      // 先判断一下onclose是不是一个函数
      // console.log(typeof this.onClose === 'function')
      // if( typeof this.onClose === 'function'){
      //   //this === toast实例
      //   this.onClose(this)
      // }
      // 换种方式结合也行
      if(this.closeButton
        && typeof this.closeButton.callback === 'function') {
          this.closeButton.callback(this)
        }
    },

    // transition离开时候钩子函数afterleave的回调
    handleAfterLeave () {
      // this.$el.remove()
      this.$destroy(true);
      // 从浏览器删除改dom元素
      this.$el.parentNode.removeChild(this.$el);
    },

    // 主要是update div.line的height
    updateStyles() {
      // DOM 还没有更新
      // 要么用setTimeout 要么用vue的api 异步更新队列
      this.$nextTick( ()=> {
        this.$refs.line.style.height = 
          `${this.$refs.toast.getBoundingClientRect().height}px`
      })
    }
    // 监听用户的键盘事件按ESC的回调
    // keydown(e) {
    //   if (e.keydown === 27) {
    //     if (!this.closed) {
    //       this.close()
    //     }
    //   }
    // }
  },
  mounted(){
    this.updateStyles()
    this.startTimer()
  },
  computed: {
    toastClasses () {
      return {
        // key假如有变量或者用变量要用[]
        [`position-${this.position}`] : true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$font-size: 14px;
$toast-min-height: 40px;
$toast-bg: rgba(0, 0, 0, 0.75);
// 动画
// @keyframes slide-up {
//   0% {opacity: 0; transform: translateY(100%);}
//   100% {opacity: 1;transform: translateY(0%);}
// }
// @keyframes slide-down {
//   0% {opacity: 0; transform: translateY(-100%);}
//   100% {opacity: 1;transform: translateY(0%);}
// }
@keyframes fade-in {
  0% {opacity: 0; }
  100% {opacity: 1;}
}
.toast {
  transform: translateX(-50%);
  font-size: $font-size;
  line-height: 1.8;
  min-height: $toast-min-height;
  background: $toast-bg;
  border: 1px solid #ebeef5;;
  box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.50);
  color: white;
  padding: 0 16px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  position: fixed;
  left: 50%;
  $animation-duration: 300ms;
  &.position-top {
    top: 0;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    animation: fade-in $animation-duration;
  }
  &.position-bottom {
    bottom: 0;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    animation: fade-in $animation-duration;
  }
  &.position-middle{
    top: 50%;
    transform: translateX(-50%) translateY(-50%);
    animation: fade-in $animation-duration;
  }
  .line {
    // 父元素给了min-height 这里100%失效了
    // 所以要updateStyles
    height: 100%;
    border-left: 1px solid #666;
    margin-left: 16px;
  }
  .close {
    padding-left: 16px;
    flex-shrink: 0;
    cursor: pointer;
  }
}

</style>