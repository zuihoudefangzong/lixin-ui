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
    // flex布局下的水平排列方式justify
    justify: {
      type: String,
      validator(value) {
        // includes 是否包含
        return ['start', 'center', 'end', 
          'space-around', 'space-between'].indexOf(value) >= 0
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
      let { justify } = this
      return [
        justify && `justify-${justify}`,
      ]
    },
  },
}
</script>

<style lang="scss" scoped>
.row {
  // flex是占完width100% default不换行
  display: flex;
  &.justify-start { justify-content: flex-start;}
  &.justify-center { justify-content: center;}
  &.justify-end { justify-content: flex-end;}
  &.justify-space-around { justify-content: space-around;}
  &.justify-space-between { justify-content: space-between;}
}
</style>