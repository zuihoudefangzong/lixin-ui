<template>
  <div class="popover" @click.stop="xxx">
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
    xxx() {
      if(this.visible === true ) {
        console.log('组件本身隐藏的')
        this.close()
      } else {
        this.open()
      }
    },
    // 用户点击popover了
    open() {
      // 显示的内容
      this.visible = true
      // 给整个文档docuent添加事件监听
    
      this.$nextTick( ()=> {
        console.log(this.$refs.contentWrapper)
        // 当visible为true就存在dom树上了
        document.body.appendChild(this.$refs.contentWrapper)
        // 由于要放在this.$refs.contentWrapper附近
        let { width, height, top, left} = this.$refs.triggerWrapper.getBoundingClientRect()
        console.log(width, height, top, left)
        this.$refs.contentWrapper.style.left = window.scrollX + left + 'px'
        this.$refs.contentWrapper.style.top = window.scrollY + top + 'px'
        document.addEventListener('click', this.onClickDocument)
      },0)
    },
    // 隐藏popover内容 同时移除整个文档的事件监听
    close() {
      this.visible = false
      document.removeEventListener('click', this.onClickDocument)
    },
    onClickDocument() {
      console.log('document隐藏的')
      this.close()
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
}
</style>