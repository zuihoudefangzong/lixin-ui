<template>
  <transition name="carousel">
    <div class="li-carousel-item" v-if="visible">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'LiCarouselItem',
  props: {
    // 幻灯片的名字必传
    name: String,
    require: true
  },
  data() {
    return {
      // 当前显示幻灯片的名字
      selected: undefined
    }
  },
  computed: {
    // 显示状态
    visible: {
      get() {return this.selected === this.name },
      set() {return }
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel-enter-active, 
.carousel-leave-active {
  transition: all 1s;
}
.carousel-enter {
  transform: translateX(100%);
}
.carousel-leave-to {
  transform: translateX(-100%);
  // 同时离开让出位置 脱离文档流就不占位置了
  position: absolute;
  top: 0;
  left: 0;
  border: 5px solid black;
  background: orange;
}
</style>