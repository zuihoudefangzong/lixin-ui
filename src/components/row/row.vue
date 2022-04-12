<template>
  <!-- // gutter分栏间隔gutter/2后不用加px vue会帮我们加 -->
  <div class="row"
    :style="{marginLeft: -gutter/2 + 'px',marginRight: -gutter/2 + 'px'}"
  >
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
      default: 0
    }
  },
  // 子组件也挂到row(父)身上了
  mounted(){
    console.log(this.$children.gutter)
    this.$children.forEach(
      vm => {
        vm.gutter = this.gutter
      }
    )
    
  }
}
</script>

<style lang="scss" scoped>
.row {
  // flex是占完width100% default不换行
  display: flex;
}
</style>