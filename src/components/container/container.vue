<template>
  <!-- isVertical计算完返回true 就有is-vertical的css的clase类 -->
  <section class="container" :class="{'is-vertical': isVertical}">
    <slot></slot>
  </section>
</template>

<script>
export default {
  name: 'LiContainer',
  props:{
    // flex-direction子元素的排列方向
    // 本质只有row和column
    direction: String
  },
  computed: {
    // 子元素中有li-header或li-footer时为主轴为y垂直方向vertical
    // 否则为主轴为x轴水平方向horizontal
    isVertical() {
      // 解构出插槽中所有vue组件和用户传的direction
      let { direction, $slots } = this
      if (direction) {
        if (direction === 'vertical') {
          return true
        }
        else if (direction === 'horizontal') {
          return false
        }
      }
      // 假如使用者没有传direction
      else {
        // 要判断slots里面是否有组件名为li-header或者li-footer
        return $slots && $slots.default
          ? $slots.default.some(
            vnode => {
              const tag = vnode.componentOptions && vnode.componentOptions.tag
              return tag === 'li-header' || tag === 'li-footer' 
            }
          )
          : false
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  // 默认li-container下没有li-header或li-footer组件
  flex-direction: row;
  border: 1px solid red;
  // 当自身为flex下子元素时候 li-container里面嵌套li-container
  flex-grow: 1;
  &.is-vertical {
    flex-direction: column;
  }
}
</style>