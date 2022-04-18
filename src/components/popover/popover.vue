<template>
  <div class="popover" ref="popover" @click="onClick" >
    <!-- @click.stop显示后 点击不隐藏 -->
    <div class="content-wrapper"
      v-if="visible"
      @click.stop
      ref="contentWrapper"
    >
      <slot name="content"></slot>
    </div>
    <span ref="triggerWrapper">
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
      // 假如监听到触发的dom是this.$refs.contentWrapper或是this.$refs.contentWrapper后代节点Node的dom
      // if(contentWrapper && (contentWrapper === e.target || contentWrapper.contains(e.target) )) { return }
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
.popover {
  display: inline-block;
  // 对齐方式
  vertical-align: top;
  position: relative;
}
// content-wrapper是在body后面的
.content-wrapper {
    position: absolute;
    border: 1px solid red;
    box-shadow: 0 2px 12px 0 rgb(0,0,0 / 10%);
    transform: translateY(-100%);
}
</style>