<template>
  <div class="li-carousel">
    <!-- 窗口window -->
    <div class="li-carousel-window">
      <div class="li-carousel-wrapper">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LiCarousel',
  props: {
    // 默认选中的幻灯片
    selected: String
  },
  mounted() {
    this.updateChildren()
  },
  updated () {
    this.updateChildren()
  },
  methods: {
    getSelected(){
      let first = this.$children[0]
      return this.selected || first.name
    },
    updateChildren(){
      let selected = this.getSelected()
      this.$children.forEach( vm => {
        vm.selected = selected
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.li-carousel {
  display: inline-block;
  border: 1px solid black;
  // 继承上面的前缀 li-carousel-window
  &-window { overflow: hidden;}
  &-wrapper { 
    border: 3px solid green;
    position: relative;
  }
}
</style>