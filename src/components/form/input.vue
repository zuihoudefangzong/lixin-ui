<template>
  <div>
    <!-- $attrs通过v-bind显性的绑定到非根元素 -->
    <input
      :type="type"
      :value="value"
      @change="$emit('change', $event.target.value)"
      @input="$emit('input', $event.target.value)"
      @focus="$emit('focus', $event.target.value)"
      @blur="$emit('blur', $event.target.value)"
      v-bind="$attrs"
    >
  </div>
</template>

<script>
export default {
  name: 'LgInput',
  // 当使用lgInput组件 属性传参时候
  // 非props里面定义好的属性
  // 默认继承到lgInput组件最外层的根元素div上
  inheritAttrs: false,
  props: {
    value: String,
    type: {
      type: String,
      default: 'text'
    }
  }
};
</script>

<style lang="scss" scoped>

</style>