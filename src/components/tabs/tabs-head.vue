<template>
  <div class="tabs-head">
    <slot></slot>
    <!-- 具名插槽 右边按钮 -->
    <slot name="actions"></slot>
  </div>
</template>
<script>
export default {
  name:  'LiTabsHead',
  // 在任何后代组件里，我们都可以使用inject选项
  // 接收指定的我们想要添加在这个实例上的 property
  inject: ['eventBus'],
  created(){
  }
}
</script>

<style lang="scss" scoped>
.tabs-head {
  
}
</style>