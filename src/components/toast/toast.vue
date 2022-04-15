<template>
  <transition @after-leave="handleAfterLeave">
    <!-- 一旦隐藏同时触发了transition离开时候钩子函数afterleave -->
    <!-- 鼠标移动到该div和 -->
    <div
      class="toast"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <slot></slot>
      <span
        class="close"
        v-if="closeButton"
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
      default: 0
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
      console.log(this.timer)
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
      this.$destroy(true);
      this.$el.parentNode.removeChild(this.$el);
    },

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
    this.startTimer()
  }
}
</script>

<style lang="scss" scoped>
$font-size: 14px;
$toast-min-height: 40px;
$toast-bg: rgba(0, 0, 0, 0.75);
.toast {
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: $font-size;
  line-height: 1.8;
  height: $toast-min-height;
  background: $toast-bg;
  border: 1px solid #ebeef5;;
  box-shadow: 0px 0px 3px 0px rgba(0,0,0,0.50);
  color: white;
  padding: 15px;
  padding-left: 20px;
  display: flex;
  align-items: center;
  border-radius: 4px;
}
.close {
  border: 1px solid red;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    height: 100px;
  }
}
</style>