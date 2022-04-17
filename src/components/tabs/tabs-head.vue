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
  props: {
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
.tabs-head {
  
}
</style>