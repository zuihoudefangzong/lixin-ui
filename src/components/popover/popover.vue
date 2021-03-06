<template>
  <div class="popover" ref="popover">
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
    // content-wrapper的位置
    position: {
      type: String,
      default: 'top',
      validator (value) {
          return ['top', 'bottom', 'left', 'right'].indexOf(value) >= 0
        }
    },
    // 触发方式
    trigger: {
      type: String,
      default: 'click',
      validator(value) {
        return ['click','hover'].indexOf(value) >= 0
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
      console.log(this.$refs.popover)
      document.removeEventListener('click', this.onClickDocument)
    },

    // document事件监听排除特定dom
    onClickDocument(e) {
      // console.log(e.target)
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
      const { width, height, top, left} = triggerWrapper.getBoundingClientRect()
      const {height: height2, width: width2} = contentWrapper.getBoundingClientRect()
      // console.log(width, height, top, left)
      // 写if else_if else 不如写一个对象
      let positions = {
        // default top
        top: {
          top: top + window.scrollY,
          left: left + window.scrollX,
        },
        // bottom的top要加上popover的默认slot的高度
        bottom: {
          top: top + window.scrollY + height,
          left: left + window.scrollX,
        },
        left: {
          // 左边 top就要减去triggerWrapper和contentWrapper高度差的一半
          // 左边 left 就要加上triggerWrapper的width
          top: top + window.scrollY + (height - height2)/2,
          left: left + window.scrollX - width2,
        },
        right: {
          // 右边 top就要减去triggerWrapper和contentWrapper高度差的一半
          // 左边 left就要加上contentWrapper的width
          top: top + window.scrollY + (height - height2) / 2,
          left: left + window.scrollX + width,
        }
      }
      contentWrapper.style.left = positions[this.position].left + 'px'
      contentWrapper.style.top = positions[this.position].top +  'px'
    },

    // div.ref=popover添加事件监听类型
    addPopoverListeners() {
      const { popover } = this.$refs
      if (this.trigger === 'click'){
        popover.addEventListener('click', this.onClick)
      }
      else if (this.trigger === 'hover') {
        popover.addEventListener('mouseenter', this.open)
        popover.addEventListener('mouseleave', this.close)
      }
    },
    // 因为是手动添加 没用@事件名 vue不知道
    removePopoverListeners(){
      const { popover } = this.$refs
      if (this.trigger === 'click'){
        popover.removeEventListener('click', this.onClick)
      }
      else if (this.trigger === 'hover') {
        popover.removeEventListener('mouseenter', this.open)
        popover.removeEventListener('mouseleave', this.close)
      }
    },
    // 既然要销毁组件就把body后面的dom div.contentWrapper也移除吧
    // 主要针对像点击 弹出后 组件又准备销毁了
    putBackContent() {
      const {contentWrapper, popover} = this.$refs
      if(!contentWrapper){return}
      popover.appendChild(contentWrapper)
      // let div = document.querySelector('.content-wrapper')
      // if(div){div.parentNode.removeChild(div)}
      // document.removeEventListener('click', this.onClickDocument)
    } 
  },
  mounted() {
    this.addPopoverListeners()
  },
  // 组件准备销毁了
  beforeDestroy() {
    this.putBackContent()
    // 因为是手动添加 没用@事件名 vue不知道
    this.removePopoverListeners()
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
      // border: 10px solid black;
    }
    // 默认的top
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
        top: calc(100% - 1px);
      }
      // 在往左边距离10px就够了
      &::before,&::after {
        left: 10px;
      }
    }
    // bottom
    &.position-bottom {
      margin-top: 10px;
      // 覆盖默认的::before和
      &::before {
        border-bottom-color: #ebeef5;
        border-top: none;
        bottom: 100%;
      }
      // 覆盖默认的::after
      &::after {
        border-bottom-color: white;
        border-top: none;
        bottom: calc(100% - 1px);
      }
      // 在往左边距离10px就够了
      &::before,&::after {
        left: 10px;
      }
    }
    // left
    &.position-left {
      margin-left: -10px;
      // 覆盖默认的::before
      &::before {
        border-left-color: #ebeef5;
        // border-bottom: none;
        left: 100%;
      }
      // 覆盖默认的::after
      &::after {
        border-left-color: white;
        // border-bottom: none;
        // top: calc(100% - 2px);
        left: calc(100% - 2px)
      }
      // 在往左边距离10px就够了
      &::before,&::after {
        // 都距离已定位的父元素top50%
        top: 50%;
        // 然后通过translateY 一到父元素垂直方向的中心
        transform: translateY(-50%);
      }
    }
    // right
    &.position-right {
      margin-left: 10px;
      // 覆盖默认的::before
      &::before {
        border-right-color: #ebeef5;
        // border-bottom: none;
        right: 100%;
      }
      // 覆盖默认的::after
      &::after {
        border-right-color: white;
        // border-bottom: none;
        // top: calc(100% - 2px);
        right: calc(100% - 2px)
      }
      // 在往左边距离10px就够了
      &::before,&::after {
        // 都距离已定位的父元素top50%
        top: 50%;
        // 然后通过translateY 一到父元素垂直方向的中心
        transform: translateY(-50%);
      }
    }
}
</style>