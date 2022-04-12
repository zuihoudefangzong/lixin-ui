<template>
  <div class="col"  :class="[`col-${span}`]">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LiCol',
  props: {
    span: {
      // 可以传string或者Number
      // :span使用者老是忘记加:
      type: [Number, String],
      // 不传默认当前col占父元素width100%
      default: 24
    }
  }
}
</script>

<style lang="scss" scoped>
.col {
  height: 100px;
  background: grey;
  border: 1px solid red;
  // scss循环生成样式
  // 前缀col-拼接循环的n
  // n从1开始 (包含)24结束
  $class-prefix:col-;
  @for $n from 1 through 24 {
    &.#{$class-prefix}#{$n} {
      width: ($n / 24) * 100%;
    }
  }
}
</style>