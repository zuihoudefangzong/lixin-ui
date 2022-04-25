<template>
  <div class="li-carousel-item" v-if="visible">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'LiCarouselItem',
  data() {
    return {
      visible:false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>