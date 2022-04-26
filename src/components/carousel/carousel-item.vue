<template>
  <transition name="carousel">
    <div class="li-carousel-item"
      v-if="visible"
      :class="{reverse}"
    >
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
      selected: undefined,
      // 反 也就是默认不走反方向(左)
      reverse: false
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
.carousel-leave-active {
  // 同时离开让出位置 脱离文档流就不占位置了
  position: absolute;
  left: 0; top: 0;
  // 由于脱离文档流了 避免width和height没有
  width: 100%; height: 100%;
}
// transition过渡
.carousel-enter-active, 
.carousel-leave-active {
  transition: all 1s;
}
// 显示的时候
.carousel-enter {
  transform: translateX(100%);
}
// 反的时候 右边到左边
.carousel-enter.reverse { transform: translateX(-100%);}
// 离开的时候
.carousel-leave-to {
  transform: translateX(-100%);
}
// 反的时候 右边到左边
.carousel-leave-to.reverse { transform: translateX(100%);}
</style>