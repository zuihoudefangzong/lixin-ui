<template>
  <div class="popover" @click.stop="xxx">
    <!-- @click.stop显示后 点击不隐藏 -->
    <div class="content-wrapper"
      v-if="visible"
      @click.stop
    >
      <slot name="content"></slot>
    </div>
    <slot></slot>
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
    
      setTimeout( ()=>{
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
  }
}
</script>

<style lang="scss" scoped>
.popover {
  display: inline-block;
  // 对齐方式
  vertical-align: top;
  position: relative;
  >.content-wrapper {
    position: absolute;
    bottom: 100%;
    left: 0;
    border: 1px solid red;
    box-shadow: 0 2px 12px 0 rgb(0,0,0 / 10%);
  }
}
</style>