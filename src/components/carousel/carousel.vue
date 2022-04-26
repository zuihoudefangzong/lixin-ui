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
    selected: String,
    // 轮播自动播放true
    autoPlay: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 我的儿子li-carousel-item有多少个
      childrenLength: 0,
      // 最后1个被选中
      lastSelectedIndex: undefined,
    }
  },
  mounted() {
    this.updateChildren()
    this.playAutomatically()
  },
  updated () {
    this.updateChildren()
  },
  computed: {
    items () {
      // 找到所有children li-carousel-item
      return this.$children.filter( vm => vm.$options.name === 'LiCarouselItem')
    },
    names () {
      // 找到所有children的$data的name
      return this.items.map(vm => vm.name)
    },
    selectedIndex () {
      // 当前轮播到的index
      let index = this.names.indexOf(this.selected)
      // 假如用户没传或者传错
      return index === -1 ? 0 : index
    }
  },
  methods: {
    getSelected(){
      return this.selected || this.$children[0].name
    },
    // 轮播自动播放function
    playAutomatically () {
      // 拿到所有childrenVue组件的name属性
      const names = this.$children.map( vm => vm.name)
      let index = names.indexOf(this.getSelected())
      console.log(names.length)
      // 避免直接用setInterval 老手setTimeout模拟setIneterval
      let run = () => {
        let newIndex = index -1
        if(newIndex === names.length ) {newIndex = 0}
        if(newIndex === -1 ) {newIndex =  names.length - 1}
        this.$emit('update:selected', names[newIndex]);
        // 不断调用自己
        setTimeout(run, 6000);
      }
      setTimeout(run, 6000);
    },
    // 更新所有children的selected
    updateChildren(){
      let selected = this.getSelected()
      this.items.forEach( vm => {
        vm.selected = selected
        let newIndex = this.names.indexOf(selected)
        let oidIndex = this.names.indexOf(vm.name)
        vm.reverse = newIndex > oidIndex ? false :true
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.li-carousel {
  border: 1px solid black;
  // 继承上面的前缀 li-carousel-window
  &-window { overflow: hidden;}
  &-wrapper { 
    border: 3px solid green;
    position: relative;
  }
}
</style>