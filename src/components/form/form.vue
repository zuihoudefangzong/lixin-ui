<template>
  <form class="li-form">
    <slot></slot>
  </form>
</template>

<script>
export default {
  name: 'LiForm',
  props: {
    // model表单数据对象
    model: Object,
    // rulse表单验证规则
    rules: Object,
  },
  // eventBus 依赖provide
  provide () {
    return {
      form: this
    }
  }
};
</script>

<style lang="scss" scoped>

</style>