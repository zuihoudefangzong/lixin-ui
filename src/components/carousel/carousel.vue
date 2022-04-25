<template>
  <div class="li-carousel">
    <!-- 窗口window -->
    <div class="li-carousel-window">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LiCarousel',
  mounted() {
    let first = this.$children[0]
    let second = this.$children[1]
    first.visible = true
    setTimeout(() => {
      first.visible = false
      second.visible = true
    },3000)
  }
}
</script>

<style lang="scss" scoped>
.li-carousel {
  // 继承上面的前缀 li-carousel-window
  &-window {}
}
</style>