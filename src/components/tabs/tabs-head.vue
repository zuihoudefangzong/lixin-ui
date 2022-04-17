<template>
  <div class="tabs-head">
    <slot></slot>
    <div class="actions-wapper">
      <!-- 具名插槽 右边按钮 -->
      <slot name="actions"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name:  'LiTabsHead',
  // 在任何后代组件里，我们都可以使用inject选项
  // 接收指定的我们想要添加在这个实例上的 property
  inject: ['eventBus'],
  
}
</script>

<style lang="scss" scoped>
$tabs-height: 40px;
.tabs-head {
  display: flex;
  height: $tabs-height;
  align-items: center;
  border: 1px solid red;
  >.actions-wapper {
    margin-left: auto;
  }
}
</style>