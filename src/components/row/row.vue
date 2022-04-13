<template>
  <!-- // gutter分栏间隔gutter/2后不用加px vue会帮我们加 -->
  <div class="row" :style="rowStyle" :class="rowClass">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LiRow',
  props: {
    // 栅格间隔gutter
    gutter: {
      type: [Number, String],
    },
    // flex布局下的水平排列方式justify-content
    justify: {
      type: String,
      validator(value) {
        // indexOf是否包含
        return ['start', 'center', 'end', 
          'space-around', 'space-between'].indexOf(value) >= 0
      }
    },
    // flex布局下的垂直排列方式align-items
    align: {
      type: String,
      validator(value) {
        // indexOf是否包含
        return ['top', 'middle', 'bottom'].indexOf(value) >= 0
      }
    }
  },
  // 子组件也挂到row(父)身的时候就可以
  mounted(){
    this.$children.forEach(
      vm => {
        vm.gutter = this.gutter
      }
    )

  },
  computed: {
    rowStyle () {
      return {
        marginLeft: -this.gutter / 2 + 'px',
        marginRight: -this.gutter / 2 + 'px'}
    },
    rowClass () {
      let { justify, align } = this
      return [
        justify && `justify-${justify}`,
        align && `align-${align}`
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
.row {
  // flex是占完width100% default不换行
  display: flex;
  // 放不下就换行
  flex-wrap: wrap;
  &.justify-start { justify-content: flex-start;}
  &.justify-center { justify-content: center;}
  &.justify-end { justify-content: flex-end;}
  &.justify-space-around { justify-content: space-around;}
  &.justify-space-between { justify-content: space-between;}
  &.align-top { align-items: flex-start;}
  &.align-middle { align-items: center;}
  &.align-bottom { align-items: flex-end;}
}
</style>