<template>
  <div class="col"
    :class="[span &&  `col-${span}`, offset && `offset-${offset}`]"
    :style="{paddingRight: gutter/2 + 'px',paddingLeft: gutter/2 + 'px'}"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LiCol',
  props: {
    // span栅格占据的列数
    span: {
      // span可以传string或者Number
      // :span使用者老是忘记加:
      type: [Number, String],
      // 不传默认当前col占父元素width100%
      default: 24
    },
    // offset分栏偏移 栅格左侧的间隔格数
    // 就是左侧给margin 
    offset: {
      type: [Number, String],
      default: 0
    },
  },
  data() {
    return {
      gutter: 0
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
  $class-prefix:offset-;
  @for $n from 1 through 24 {
    &.#{$class-prefix}#{$n} {
      margin-left: ($n / 24) * 100%;
    }
  }
}
</style>