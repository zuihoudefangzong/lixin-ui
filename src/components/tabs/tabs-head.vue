<template>
  <div class="tabs-head" ref="head">
    <slot></slot>
    <!-- 下面的线条 -->
    <div class="line" ref="line"></div>
    <div class="actions-wrapper">
      <!-- 具名插槽 右边按钮 -->
      <slot name="actions"></slot>
    </div>
  </div>
</template>
<script>
export default {
  name:  'LiTabsHead',
  // 在任何后代组件里，我们都可以使用inject选项
  // 接收指定的我们想要添加在这个实例上的 property
  inject: ['eventBus'],
  methods: {
    updateLinePosition (selectedVm) {
      // 这里left距离 是dom元素父元素border的距离
      let { width , left } = selectedVm.$el.getBoundingClientRect()
      // 解构出left再命名为left2
      let {left: left2} = this.$refs.head.getBoundingClientRect()
      this.$refs.line.style.width = `${width}px`
      this.$refs.line.style.left = `${left - left2}px`
    }
  },
  // 只有mounted后才能获取子组件
  mounted() {
    this.eventBus.$on('update:selected', (item, vm) => {
      this.updateLinePosition(vm)
    })
  },
  
}
</script>

<style lang="scss" scoped>
$tabs-height: 40px;
$border-color: #ddd;
$blue: blue;
.tabs-head {
  display: flex;
  height: $tabs-height;
  align-items: center;
  position: relative;
  border-bottom: 1px solid $border-color;
  >.line {
    position: absolute;
    bottom: 0;
    border-bottom: 1px solid $blue;
    transition: all 350ms;
  }
  >.actions-wapper {
    margin-left: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1em;
  }
}
</style>