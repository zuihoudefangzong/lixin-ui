<template>
  <div class="popover" ref="popover" @click="onClick" >
    <!-- @click.stop显示后 点击不隐藏 -->
    <div class="content-wrapper"
      v-if="visible"
      @click.stop
      ref="contentWrapper"
      :class="{[`position-${position}`]:true}"
    >
      <slot name="content"></slot>
    </div>
    <!-- span style样式解决slot里面高度比span高 -->
    <span ref="triggerWrapper"  style="display: inline-block;">
      <slot></slot>
    </span>
  </div>
</template>
<script>
export default {
  name: 'LiPopover',
  data() {
    return {
      // 显示状态
      visible: false
    }
  },
  props: {
    position: {
      type: String,
      default: 'top',
      validator (value) {
          return ['top', 'bottom', 'left', 'right'].indexOf(value) >= 0
        }
    }
  },
  methods: {
    onClick(event) {
      // this.$refs获取的就是原生dom
      // console.log(this.$refs.triggerWrapper)
      // console.log(event.target)
      // Node.contains来表示传入的节点是否为该节点的后代节点。
      // 只有点击到span.ref="triggerWrapper"才会显示或者隐藏
      // 点击到上面div.ref="contentWrapper"不隐藏
      if(this.$refs.triggerWrapper.contains(event.target)){
        if(this.visible === true ) {
          console.log('组件本身隐藏的')
          this.close()
        } else {
          this.open()
        }
      }
    },
    // 用户点击了后显示加事件监听
    open() {
      // 显示的内容
      this.visible = true
      // 当visible为true就存在dom树上了
      // console.log(this.$refs.contentWrapper)
      // 给整个文档docuent添加事件监听
      this.$nextTick( ()=> {
        this.positionContent()
        console.log('document添加监听')
        document.addEventListener('click', this.onClickDocument)
      },0)
    },

    // 隐藏popover内容 同时移除整个文档的事件监听
    close() {
      this.visible = false
      console.log('document结束监听')
      document.removeEventListener('click', this.onClickDocument)
    },

    // document事件监听排除特定dom
    onClickDocument(e) {
      console.log(e.target)
      const { popover, contentWrapper} = this.$refs
      // div.popover的onclick事件的冒泡和document监听onclick导致刚点就又隐藏
      // 假如监听到触发的dom是this.$refs.popver或是this.$refs.popver后代节点Node的dom
      if(popover && (popover === e.target || popover.contains(e.target) )) { return }

      // 因为最终contentWrapper最终会appchildren到body后面
      // 假如监听到触发的dom是this.$refs.contentWrapper或是this.$refs.contentWrapper后代节点Node的dom
      if(contentWrapper && (contentWrapper === e.target || contentWrapper.contains(e.target) )) { return }
      // 点到document文档其他dom就隐藏this.$refs.triggerWrapper
      console.log('document隐藏的')
      this.close()
    },
    
    // 定位div.ref=contentWrapper
    positionContent() {
      const { contentWrapper, triggerWrapper } = this.$refs
      document.body.appendChild(contentWrapper)
      // 由于要放在this.$refs.contentWrapper附近
      let { width, height, top, left} = triggerWrapper.getBoundingClientRect()
      // console.log(width, height, top, left)
      contentWrapper.style.left = window.scrollX + left + 'px'
      contentWrapper.style.top = window.scrollY + top + 'px'
    }
  },
  mounted() {
    // console.log(this.$refs.contentWrapper)
    // console.log(this.$refs.triggerWrapper)
  }
}
</script>

<style lang="scss" scoped>
$border-radius: 4px;
.popover {
  display: inline-block;
  // 对齐方式
  vertical-align: top;
  position: relative;
}
// content-wrapper是在body后面的
.content-wrapper {
    position: absolute;
    color: #606266;
    border: 1px solid #ebeef5;
    // 两个阴影都可以
    // filter: drop-shadow(0 1px 1px rgba(0, 0, 0, 0.5));
    box-shadow: 0 2px 12px 0 rgba(0,0,0,0.1);
    border-radius: $border-radius;
    padding: 18px 20px;
    background: #fff;
    // 文字过多限制
    max-width: 20em;
    // 自动换行
    word-break: break-all;
    // 下面的小三角
    &::before, &::after{
      content: '';
      position: absolute;
      display: block;
      width: 0;
      height: 0;
      border: 10px solid transparent;
    }
    // 默认上方top
    &.position-top {
      transform: translateY(-100%);
      margin-top: -10px;
      // 覆盖默认的::before和
      &::before {
        border-top-color: #ebeef5;
        border-bottom: none;
        top: 100%;
      }
      // 覆盖默认的::after
      &::after {
        border-top-color: white;
        border-bottom: none;
        top: calc(100% - 2px);
      }
      // 在往左边距离10px就够了
      &::before,&::after {
        left: 10px;
      }
    }
}
</style>