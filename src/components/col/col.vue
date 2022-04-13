<template>
  <div class="col" :class="colClass" :style="colStyle">
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
      gutter: 0,
    }
  },
  // 如果需要gutter变了 colStyle也跟着变那么需要监听
  computed: {
      colClass(){
        let { span, offset } = this
        return [
          span && `col-${span}`,
          offset && `offset-${offset}`
        ]
      },
      colStyle() {
        let { gutter } = this
        return {
          paddingRight: gutter / 2 + 'px',
          paddingLeft: gutter / 2 + 'px'
        }
      }
  }
}
</script>

<style lang="scss" scoped>
.col {
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